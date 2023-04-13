var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calcResultNumber, calcUserProfit, createHashChain, createTypedData, fromGweiToWei, GameStatus as ContractStatus, keccak, ReasonEnded as ContractReasonEnded, verifySeed, verifySignature, } from "@dicether/state-channel";
import * as Sentry from "@sentry/browser";
import retry from "async-retry";
import axios from "axios";
import { CHAIN_ID, CONTRACT_ADDRESS, NETWORK_NAME, SERVER_ADDRESS, SIGNATURE_VERSION } from "../../../../config/config";
import { getLogGameCreated, getReasonEnded } from "../../../../contractUtils";
import { isLocalStorageAvailable } from "../../../../util/util";
import { addNewBet } from "../../bets/asyncActions";
import { catchError } from "../../utilities/asyncActions";
import { getTransactionReceipt, signTypedData } from "../../web3/asyncActions";
import { addBet, creatingGame, endedGame, endedWithReason, gameCreated, restoreState, revealSeed, serverConflictEnd, userAbortConflictEnd, userAbortForceEnd, userConflictEnd, userInitiateConflictEnd, userInitiateForceEnd, } from "./actions";
const STORAGE_VERSION = 2;
//
// Event handling
//
function canCreateGame(gameState) {
    const status = gameState.status;
    return status === "ENDED" || (status === "CREATING" && !gameState.createTransactionHash);
}
function createGameEvent(hashChain, serverEndHash, value, transactionHash) {
    return (dispatch, getState) => {
        if (canCreateGame(getState().games.gameState)) {
            dispatch(creatingGame(hashChain, serverEndHash, value, transactionHash));
        }
        else {
            Sentry.captureMessage("Unexpected createGameEvent");
        }
    };
}
function canEndGame(gameState) {
    const status = gameState.status;
    return status !== "ENDED";
}
function endGameEvent(reason) {
    return (dispatch, getState) => {
        if (canEndGame(getState().games.gameState)) {
            dispatch(endedWithReason(reason));
        }
        else {
            Sentry.captureMessage("Unexpected endGameEvent");
        }
    };
}
function canRegularEndGame(gameState) {
    const status = gameState.status;
    return status === "ACTIVE";
}
export function canUserEndGame(gameState) {
    const status = gameState.status;
    const reasonEnded = gameState.reasonEnded;
    return status == "ENDED" && reasonEnded == "REGULAR_ENDED";
}
function regularEndGameEvent(roundId, serverHash, userHash, serverSig, userSig, endTransactionHash) {
    return (dispatch, getState) => {
        if (canRegularEndGame(getState().games.gameState)) {
            dispatch(endedGame(roundId, serverHash, userHash, serverSig, userSig, endTransactionHash));
        }
        else {
            Sentry.captureMessage("Unexpected regularEndGameEvent");
        }
    };
}
function canActivateGame(gameState) {
    const status = gameState.status;
    return status === "CREATING";
}
function activateGameEvent(gameId, serverHash, userHash) {
    return (dispatch, getState) => {
        const gameState = getState().games.gameState;
        if (canActivateGame(gameState)) {
            if (serverHash !== gameState.serverHash) {
                throw Error(`Unexpectd serverHash: ${serverHash}, expected ${gameState.serverHash}`);
            }
            if (userHash !== gameState.userHash) {
                throw Error(`Unexpectd userHash: ${userHash}, expected ${gameState.userHash}`);
            }
            dispatch(gameCreated(gameId));
        }
        else {
            Sentry.captureMessage("Unexpected activateGameEvent");
        }
    };
}
function canPlaceBet(gameState) {
    const status = gameState.status;
    return status === "ACTIVE";
}
function placeBetEvent(bet, serverSig, userSig) {
    return (dispatch, getState) => {
        if (canPlaceBet(getState().games.gameState)) {
            dispatch(addBet(bet, serverSig, userSig));
        }
        else {
            Sentry.captureMessage("Unexpected placeBetEvent");
        }
    };
}
function canRevealSeed(gameState) {
    const status = gameState.status;
    return status === "PLACED_BET";
}
function revealSeedEvent(serverSeed, userSeed, balance) {
    return (dispatch, getState) => {
        if (canRevealSeed(getState().games.gameState)) {
            dispatch(revealSeed(serverSeed, userSeed, balance));
        }
        else {
            Sentry.captureMessage("Unexpected revealSeedEvent");
        }
    };
}
export function canUserInitiateConflictEnd(gameState) {
    const status = gameState.status;
    return status === "ACTIVE" || status === "PLACED_BET" || status === "SERVER_CONFLICT_ENDED";
}
function userInitiateConflictEndEvent(transactionHash) {
    return (dispatch, getState) => {
        if (canUserInitiateConflictEnd(getState().games.gameState)) {
            dispatch(userInitiateConflictEnd(transactionHash));
        }
        else {
            Sentry.captureMessage("Unexpected userInitiateConflictEndEvent");
        }
    };
}
function canUserConflictEnd(gameState) {
    const status = gameState.status;
    return status === "USER_INITIATED_CONFLICT_END";
}
function userConflictEndEvent(time) {
    return (dispatch, getState) => {
        if (canUserConflictEnd(getState().games.gameState)) {
            dispatch(userConflictEnd(time));
        }
        else {
            Sentry.captureMessage("Unexpected userConflictEndEvent");
        }
    };
}
function canUserAbortConflictEnd(gameState) {
    const status = gameState.status;
    return status === "USER_INITIATED_CONFLICT_END";
}
function userAbortConflictEndEvent() {
    return (dispatch, getState) => {
        if (canUserAbortConflictEnd(getState().games.gameState)) {
            dispatch(userAbortConflictEnd());
        }
        else {
            Sentry.captureMessage("Unexpected userAbortConflictEndEvent");
        }
    };
}
function canUserInitiateForceEnd(gameState) {
    const status = gameState.status;
    return status === "USER_CONFLICT_ENDED";
}
function userInitiateForceEndEvent(transactionHash) {
    return (dispatch, getState) => {
        if (canUserInitiateForceEnd(getState().games.gameState)) {
            dispatch(userInitiateForceEnd(transactionHash));
        }
        else {
            Sentry.captureMessage("Unexpected userInitiateForceEndEvent");
        }
    };
}
function canUserForceEnd(gameState) {
    const status = gameState.status;
    return status === "USER_INITIATED_FORCE_END";
}
function userForceEndEvent() {
    return (dispatch, getState) => {
        if (canUserForceEnd(getState().games.gameState)) {
            dispatch(endedWithReason("END_FORCED_BY_USER"));
        }
        else {
            Sentry.captureMessage("Unexpected userForceEndEvent");
        }
    };
}
function canUserAbortForceEnd(gameState) {
    const status = gameState.status;
    return status === "USER_INITIATED_FORCE_END";
}
function userAbortForceEndEvent() {
    return (dispatch, getState) => {
        if (canUserAbortForceEnd(getState().games.gameState)) {
            dispatch(userAbortForceEnd());
        }
        else {
            Sentry.captureMessage("Unexpected userAbortForceEndEvent");
        }
    };
}
function canServerConflictEnd(gameState) {
    const status = gameState.status;
    return (status === "CREATING" ||
        status === "USER_CONFLICT_ENDED" ||
        status === "USER_INITIATED_CONFLICT_END" ||
        status === "USER_INITIATED_FORCE_END" ||
        status === "ACTIVE" ||
        status === "PLACED_BET");
}
function serverConflictEndEvent() {
    return (dispatch, getState) => {
        if (canServerConflictEnd(getState().games.gameState)) {
            dispatch(serverConflictEnd());
        }
        else {
            Sentry.captureMessage("Unexpected serverConflictEndEvent");
        }
    };
}
//
// util functions
//
function isTransactionFailed(receipt) {
    return !receipt.status;
}
export const validChainId = (chainId) => {
    return chainId === CHAIN_ID;
};
const checkIfEndTransactionFinished = (web3, transactionHash) => {
    if (!transactionHash) {
        return Promise.resolve(true);
    }
    return getTransactionReceipt(web3, transactionHash).then((receipt) => receipt !== null);
};
export function loadContractStateCreatedGame() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const { web3: web3State, games } = getState();
        const { contract } = web3State;
        const { gameState } = games;
        const { gameId } = gameState;
        const { web3, account } = web3State;
        if (!web3 || !account) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (gameId === undefined) {
            throw new Error("Invalid game state!");
        }
        const result = yield contract.methods.gameIdGame(gameId).call();
        const status = Number.parseInt(result.status, 10);
        if (status === ContractStatus.ENDED && canEndGame(gameState)) {
            const reasonEnded = yield getReasonEnded(web3, contract, gameId);
            return dispatch(endGameEvent(ContractReasonEnded[reasonEnded]));
        }
        else if (status === ContractStatus.USER_INITIATED_END && canUserConflictEnd(gameState)) {
            return dispatch(userConflictEndEvent(new Date()));
        }
        else if (status === ContractStatus.SERVER_INITIATED_END && canServerConflictEnd(gameState)) {
            return dispatch(serverConflictEndEvent());
        }
        else {
            return;
        }
    });
}
export function loadContractGameState() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const { web3: web3State, games } = getState();
        const { contract } = web3State;
        const { gameState } = games;
        const { web3, account, chainId } = web3State;
        if (!account || !web3 || !contract || chainId === null) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!validChainId(chainId)) {
            throw new Error(`Invalid network! You need to use ${NETWORK_NAME}!`);
        }
        if (gameState.status === "CREATING") {
            // special case as we don't know gameId to read contract state!
            if (!gameState.serverHash) {
                throw new Error("Invalid game state!");
            }
            const logCreated = yield getLogGameCreated(web3, contract, gameState.serverHash);
            if (logCreated) {
                const gameId = logCreated.returnValues.gameId;
                const serverHash = logCreated.returnValues.serverEndHash;
                const userHash = logCreated.returnValues.userEndHash;
                dispatch(activateGameEvent(gameId, serverHash, userHash));
                return dispatch(loadContractStateCreatedGame());
            }
            if (gameState.createTransactionHash) {
                const receipt = yield getTransactionReceipt(web3, gameState.createTransactionHash);
                if (!receipt) {
                    // transaction isn't mined
                    return;
                }
                if (isTransactionFailed(receipt)) {
                    return dispatch(endGameEvent("TRANSACTION_FAILURE"));
                }
            }
        }
        else if (gameState.status !== "ENDED") {
            return dispatch(loadContractStateCreatedGame());
        }
    });
}
// TODO: remove???
export function loadServerGameState() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        if (getState().games.gameState.status === "ENDED") {
            return;
        }
        try {
            const { data } = yield axios.get("stateChannel/activeGameState");
            const status = data.status;
            const gameId = data.gameId;
            const userHash = data.userHash;
            const gameState = getState().games.gameState;
            if (gameState.status === "CREATING" && status === "ACTIVE" && gameState.userHash === userHash) {
                dispatch(gameCreated(gameId));
            }
        }
        catch (error) {
            if (!error.response || error.response.status !== 404) {
                catchError(error, dispatch);
            }
        }
    });
}
export function loadLocalGameState(chainId, address) {
    return (dispatch) => {
        if (!isLocalStorageAvailable()) {
            Sentry.captureMessage("No local storage support!");
            console.warn("No local storage support!");
        }
        const storedState = localStorage.getItem(`gameState_${address}_${chainId}`);
        if (storedState !== null) {
            const state = JSON.parse(storedState);
            dispatch(restoreState(state.gameState));
        }
    };
}
export function storeGameState(address, gameState) {
    if (!isLocalStorageAvailable()) {
        Sentry.captureMessage("No local storage support!");
        console.warn("No local storage support! Can not store game state!");
        return;
    }
    localStorage.setItem(`gameState_${address}_${gameState.chainId}`, JSON.stringify({ version: STORAGE_VERSION, gameState }));
}
export function syncGameState(chainId, address) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            dispatch(loadLocalGameState(chainId, address));
            yield dispatch(loadContractGameState());
            yield dispatch(loadServerGameState());
        }
        catch (error) {
            catchError(error, dispatch);
        }
    });
}
// TODO: improve, check contract state???
export function serverActiveGame(gameId, serverHash, userHash) {
    return (dispatch) => {
        if (status === "ACTIVE") {
            // already active => do nothing
            return;
        }
        dispatch(activateGameEvent(gameId, serverHash, userHash));
    };
}
export function createGame(stake, userSeed) {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const web3State = getState().web3;
        const contract = web3State.contract;
        const account = web3State.account;
        const gameState = getState().games.gameState;
        const status = gameState.status;
        if (!isLocalStorageAvailable()) {
            throw new Error("You browser doesn't support sessionStorage/localStorage! Without playing is not possible!");
        }
        if (!validChainId(web3State.chainId)) {
            throw new Error(`Invalid chain! You need to use ${NETWORK_NAME}!`);
        }
        if (!account || !contract || !web3State.web3) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!canCreateGame(gameState)) {
            throw new Error(`Invalid game status: ${status}! Can not create game!`);
        }
        const createGame = contract.methods.createGame;
        const hashChain = createHashChain(userSeed);
        const finished = yield checkIfEndTransactionFinished(web3State.web3, gameState.endTransactionHash);
        if (!finished) {
            throw new Error("You need to wait until transaction ending game session is mined!");
        }
        const response = yield axios.post("stateChannel/createGame");
        const data = response.data;
        const serverEndHash = data.serverEndHash;
        const previousGameId = data.previousGameId;
        const createBefore = data.createBefore;
        const signature = data.signature;
        dispatch(createGameEvent(hashChain, serverEndHash, stake));
        yield new Promise((resolve, reject) => {
            createGame(hashChain[0], previousGameId, createBefore, serverEndHash, signature)
                .send({
                from: account,
                value: fromGweiToWei(stake).toString(),
                gas: 150000,
            })
                .on("error", (error) => {
                reject(error);
            })
                .on("transactionHash", (transactionHash) => {
                dispatch(createGameEvent(hashChain, serverEndHash, stake, transactionHash));
            })
                .on("receipt", (receipt) => {
                if (isTransactionFailed(receipt)) {
                    dispatch(endGameEvent("TRANSACTION_FAILURE"));
                    reject(new Error("Create game transaction failed!"));
                }
            })
                .on("confirmation", (num, receipt) => {
                // wait for 3 confirmations
                if (num === 3) {
                    const event = receipt.events ? receipt.events.LogGameCreated : null;
                    if (isTransactionFailed(receipt) || !event) {
                        dispatch(endGameEvent("TRANSACTION_FAILURE"));
                        reject(new Error("Create game transaction failed!"));
                    }
                    else {
                        const gameId = event.returnValues.gameId;
                        const serverHash = event.returnValues.serverEndHash;
                        const userHash = event.returnValues.userEndHash;
                        if (getState().games.gameState.status !== "ACTIVE") {
                            dispatch(activateGameEvent(gameId, serverHash, userHash));
                        }
                        resolve();
                    }
                }
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
export function endGame() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        const gameState = state.games.gameState;
        const account = state.web3.account;
        const web3 = state.web3.web3;
        const chainId = state.web3.chainId;
        // use previous seeds as new hashes seeds (hash chain)
        const serverHash = gameState.serverHash;
        const userHash = gameState.userHash;
        const userAddress = account;
        const gameId = gameState.gameId;
        const roundId = gameState.roundId + 1;
        const balance = gameState.balance;
        if (!getState().account.jwt) {
            throw new Error("You need to login before ending game session!");
        }
        if (!account || !web3) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!validChainId(chainId)) {
            throw new Error(`Invalid network! You need to use ${NETWORK_NAME}!`);
        }
        if (!canRegularEndGame(gameState)) {
            throw new Error(`Invalid game status ${gameState.status}! Can not end game!`);
        }
        if (!userHash || !serverHash || !userAddress || !gameId) {
            throw new Error("Invalid state!");
        }
        const bet = {
            roundId: gameState.roundId + 1,
            gameType: 0,
            num: 0,
            value: 0,
            balance,
            serverHash,
            userHash,
            gameId,
        };
        const typedData = createTypedData(bet, CHAIN_ID, CONTRACT_ADDRESS, SIGNATURE_VERSION);
        const userSig = yield signTypedData(web3, account, typedData);
        const { data } = yield axios.post("stateChannel/endGame", { bet, contractAddress: CONTRACT_ADDRESS, userSig });
        const { serverSig, transactionHash: endTransactionHash } = data;
        if (!verifySignature(bet, CHAIN_ID, CONTRACT_ADDRESS, serverSig, SERVER_ADDRESS, SIGNATURE_VERSION)) {
            throw new Error("Invalid server signature!");
        }
        dispatch(regularEndGameEvent(roundId, serverHash, userHash, serverSig, userSig, endTransactionHash));
    });
}
export function userEndGame() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        const gameState = state.games.gameState;
        const account = state.web3.account;
        const web3 = state.web3.web3;
        const contract = state.web3.contract;
        const chainId = state.web3.chainId;
        if (!web3 || !account || !contract) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!validChainId(chainId)) {
            throw new Error(`Invalid network! You need to use ${NETWORK_NAME}!`);
        }
        if (!canUserEndGame(gameState)) {
            throw new Error(`Invalid game status ${gameState.status}, ${gameState.reasonEnded}! Can not resend end transaction!`);
        }
        const roundId = gameState.roundId;
        const balance = gameState.balance;
        const serverHash = gameState.serverHash;
        const userHash = gameState.userHash;
        const gameId = gameState.gameId;
        const serverSig = gameState.serverSig;
        const userEndGame = contract.methods.userEndGame;
        yield new Promise((resolve, reject) => userEndGame(roundId, fromGweiToWei(balance).toString(), serverHash, userHash, gameId, CONTRACT_ADDRESS, serverSig)
            .send({ from: account, value: 0, gas: 120000 })
            .on("transactionHash", (_transactionHash) => {
            // nothing to do
        })
            .on("error", (error) => {
            reject(error);
        })
            .then((_receipt) => {
            // nothing to do
        })
            .catch((error) => {
            reject(error);
        }));
    });
}
export function conflictEnd() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        const gameState = state.games.gameState;
        const account = state.web3.account;
        const web3 = state.web3.web3;
        const contract = state.web3.contract;
        const chainId = state.web3.chainId;
        const gameId = gameState.gameId;
        const roundId = gameState.roundId;
        const gameType = gameState.gameType;
        const num = gameState.num;
        const oldBalance = gameState.oldBalance;
        const serverSig = gameState.serverSig;
        const contractAddress = contract.options.address;
        if (!web3 || !account || !contract) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!validChainId(chainId)) {
            throw new Error(`Invalid network! You need to use ${NETWORK_NAME}!`);
        }
        if (!canUserInitiateConflictEnd(gameState)) {
            throw new Error(`Invalid game status ${gameState.status}! Can not conflict end!`);
        }
        if (!gameState.serverHash || !gameState.userHash || gameId === undefined) {
            throw new Error("Invalid state!");
        }
        if (roundId === 0) {
            const cancelActiveGame = contract.methods.userCancelActiveGame;
            yield new Promise((resolve, reject) => cancelActiveGame(gameId)
                .send({ from: account, value: 0, gas: 120000 })
                .on("transactionHash", (transactionHash) => {
                dispatch(userInitiateConflictEndEvent(transactionHash));
            })
                .on("error", (error) => {
                reject(error);
            })
                .then((receipt) => {
                if (isTransactionFailed(receipt)) {
                    dispatch(userAbortConflictEndEvent());
                }
                else {
                    dispatch(userConflictEndEvent(new Date()));
                }
            })
                .catch((error) => {
                reject(error);
            }));
        }
        else {
            let serverHash = keccak(gameState.serverHash);
            let userHash = keccak(gameState.userHash);
            const value = fromGweiToWei(gameState.betValue).toString();
            let balance = fromGweiToWei(oldBalance).toString();
            let userSeed = gameState.userHash;
            if (gameState.status === "PLACED_BET") {
                serverHash = gameState.serverHash;
                userHash = gameState.userHash;
                balance = fromGweiToWei(gameState.balance).toString();
                userSeed = gameState.hashChain[roundId];
            }
            const userEndGameConflict = contract.methods.userEndGameConflict;
            yield new Promise((resolve, reject) => userEndGameConflict(roundId, gameType, num, value, balance, serverHash, userHash, gameId, serverSig, userSeed)
                .send({ from: account, gas: 250000 })
                .on("transactionHash", (transactionHash) => {
                dispatch(userInitiateConflictEndEvent(transactionHash));
            })
                .on("error", (error) => {
                reject(error);
            })
                .then((receipt) => {
                if (isTransactionFailed(receipt)) {
                    dispatch(userAbortConflictEnd());
                }
                else {
                    dispatch(userConflictEndEvent(new Date()));
                }
            })
                .catch((error) => {
                reject(error);
            }));
        }
    });
}
export function forceEnd() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        const gameState = state.games.gameState;
        const account = state.web3.account;
        const contract = state.web3.contract;
        const chainId = state.web3.chainId;
        const gameId = gameState.gameId;
        if (!account || !contract) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!validChainId(chainId)) {
            throw new Error(`Invalid network! You need to use ${NETWORK_NAME}!`);
        }
        if (!canUserInitiateForceEnd(gameState)) {
            throw new Error(`Invalid game status ${gameState.status}! Can not force end!`);
        }
        const userForceGameEnd = contract.methods.userForceGameEnd;
        yield new Promise((resolve, reject) => userForceGameEnd(gameId)
            .send({ from: account, value: 0, gas: 120000 })
            .on("transactionHash", (transactionHash) => {
            dispatch(userInitiateForceEndEvent(transactionHash));
        })
            .on("error", (error) => {
            return Promise.reject(error);
        })
            .then((receipt) => {
            if (isTransactionFailed(receipt)) {
                dispatch(userAbortForceEndEvent());
            }
            else {
                dispatch(userForceEndEvent());
            }
        })
            .catch((error) => {
            reject(error);
        }));
    });
}
function revealSeedRequest(gameId, roundId, userSeed) {
    return __awaiter(this, void 0, void 0, function* () {
        return retry(() => {
            return axios.post("stateChannel/revealSeed", {
                gameId,
                roundId,
                userSeed,
            });
        }, { retries: 1, minTimeout: 500 });
    });
}
export function requestSeed() {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const gameState = getState().games.gameState;
        const serverHash = gameState.serverHash;
        if (!getState().account.jwt) {
            throw new Error("You need to login before playing!");
        }
        if (!canRevealSeed(gameState)) {
            throw new Error(`Invalid game status: ${gameState.status}! Can not reveal seed!`);
        }
        const betValue = gameState.betValue;
        const userSeed = gameState.hashChain[gameState.roundId];
        const num = gameState.num;
        const gameType = gameState.gameType;
        const balance = gameState.balance;
        if (betValue === undefined || gameState.gameId === undefined || !serverHash) {
            throw new Error("Invalid game state!");
        }
        const { data } = yield revealSeedRequest(gameState.gameId, gameState.roundId, userSeed);
        const { serverSeed, balance: newServerBalance, bet } = data;
        if (!verifySeed(serverSeed, serverHash)) {
            throw new Error("Invalid server seed!");
        }
        const resNum = calcResultNumber(gameType, serverSeed, userSeed, num);
        const userProfit = calcUserProfit(gameType, num, betValue, resNum);
        const newUserBalance = balance + userProfit;
        if (newServerBalance !== newUserBalance) {
            throw new Error(`Invalid server balance! Expected ${newUserBalance} got ${newServerBalance}`);
        }
        dispatch(revealSeedEvent(serverSeed, userSeed, newServerBalance));
        return {
            betNum: bet.num,
            num: resNum,
            won: userProfit > 0,
            userProfit,
            bet,
        };
    });
}
export function manualRequestSeed() {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        const result = yield dispatch(requestSeed());
        dispatch(addNewBet(result.bet));
        return result;
    });
}
export function placeBet(num, betValue, gameType) {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const gameState = getState().games.gameState;
        const web3State = getState().web3;
        const { account, web3 } = web3State;
        // use previous seeds as new hashes seeds (hash chain)
        const serverHash = gameState.serverHash;
        const userHash = gameState.userHash;
        const roundId = gameState.roundId + 1;
        const gameId = gameState.gameId;
        const balance = gameState.balance;
        const stake = gameState.stake;
        if (!getState().account.jwt) {
            throw new Error("You need to login before playing!");
        }
        if (!web3 || !account) {
            throw new Error("You need a web3 enabled browser (Metamask)!");
        }
        if (!validChainId(web3State.chainId)) {
            throw new Error(`Invalid network! You need to use ${NETWORK_NAME}!`);
        }
        if (!canPlaceBet(gameState)) {
            throw new Error(`Invalid game status: ${gameState.status}! Can not place bet!`);
        }
        if (!serverHash || !userHash || gameId === undefined) {
            throw new Error("Invalid game state!");
        }
        if (betValue > stake + balance) {
            throw new Error("Invalid bet value: Funds to low!");
        }
        const bet = {
            roundId,
            gameType,
            num,
            value: betValue,
            balance,
            serverHash,
            userHash,
            gameId,
        };
        const typedData = createTypedData(bet, CHAIN_ID, CONTRACT_ADDRESS, SIGNATURE_VERSION);
        const userSig = yield signTypedData(web3, account, typedData);
        const { data: dataPlaceBet } = yield axios.post("stateChannel/placeBet", {
            bet,
            contractAddress: CONTRACT_ADDRESS,
            userSig,
        });
        const serverSig = dataPlaceBet.serverSig;
        if (!verifySignature(bet, CHAIN_ID, CONTRACT_ADDRESS, serverSig, SERVER_ADDRESS, SIGNATURE_VERSION)) {
            throw new Error("Error placing bet: Invalid server signature!");
        }
        dispatch(placeBetEvent(bet, serverSig, userSig));
        return dispatch(requestSeed());
    });
}
//# sourceMappingURL=asyncActions.js.map