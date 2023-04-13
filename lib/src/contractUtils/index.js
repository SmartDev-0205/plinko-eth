var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getLastGameId(web3, contract, serverEndHash, transactionHash) {
    if (contract == null) {
        return Promise.reject("Error invalid web3 state!");
    }
    return web3.eth
        .getBlockNumber()
        .then((blockNum) => {
        return contract.getPastEvents("LogGameCreated", {
            filter: { serverEndHash },
            fromBlock: Math.max(blockNum - 30 * 24 * 4 * 60, 0),
            toBlock: "latest",
        });
    })
        .then((events) => {
        const len = events.length;
        if (len === 0 || events[len - 1].transactionHash !== transactionHash) {
            return Promise.reject(new Error("Could not find event!"));
        }
        return events[len - 1].returnValues.gameId;
    });
}
export function getLogGameCreated(web3, contract, serverEndHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield web3.eth.getBlockNumber();
        const events = yield contract.getPastEvents("LogGameCreated", {
            filter: { serverEndHash },
            fromBlock: Math.max(blockNum - 30 * 24 * 4 * 60, 0),
            toBlock: "latest",
        });
        if (events.length !== 1) {
            return undefined;
        }
        return events[0];
    });
}
export function getReasonEnded(web3, contract, gameId) {
    return web3.eth
        .getBlockNumber()
        .then((blockNum) => {
        return contract.getPastEvents("LogGameEnded", {
            filter: { gameId },
            fromBlock: Math.max(blockNum - 30 * 24 * 4 * 60, 0),
            toBlock: "latest",
        });
    })
        .then((events) => {
        const len = events.length;
        if (len !== 1) {
            return Promise.reject(new Error("Could not find event!"));
        }
        return events[0].returnValues.reasonEnded;
    });
}
//# sourceMappingURL=index.js.map