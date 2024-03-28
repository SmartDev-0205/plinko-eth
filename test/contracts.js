const { expect } = require("chai");
const fs = require("fs");
const { ethers } = require("hardhat");
const { delay, fromBigNum, toBigNum } = require("./utils.js")

var owner;
var tokenContract;


describe("deploy contracts", function () {
	it("Create account", async function () {
		[owner,addr1,addr2] = await ethers.getSigners();
	});

	it("deploy contracts", async function () {
		const plinkocontract = await ethers.getContractFactory("Plinko");
		tokenContract = await plinkocontract.deploy({value: toBigNum("100", 18), gasLimit: 3e7});
		await tokenContract.deployed();

	})
});



describe("contracts test", function () {

	it("buy", async () => {
		let usercontract = await tokenContract.connect(addr1);
		let balance = await addr1.getBalance();

		let tx = await  usercontract.pliko_play(8,{ value: toBigNum("1", 18) });
		await tx.wait();
		let result = await usercontract.getResult();
		console.log("this is result",result);

		balance = await addr1.getBalance();
		console.log("after balance",balance);
	});
});



