 import { expect } from "chai";
import { ethers } from "hardhat";

describe("DigitalWealthManagement", function () {
    let DigitalWealthManagement: any;
    let digitalWealthManagement: any;
    let owner: any;
    let user: any;
    const initialBalance = ethers.utils.parseEther("1000"); // Initial balance of 1000 ETH
    const UserType = {
        Individual: 0,
        Enterprise: 1,
    };

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        DigitalWealthManagement = await ethers.getContractFactory("DigitalWealthManagement");
        digitalWealthManagement = await DigitalWealthManagement.deploy();
        await digitalWealthManagement.deployed();
    });

    it("should create a portfolio for an individual user", async function () {
        await digitalWealthManagement.connect(user).createPortfolio(initialBalance, UserType.Individual);

        const userPortfolio = await digitalWealthManagement.portfolios(user.address);
        expect(userPortfolio.owner).to.equal(user.address);
        expect(userPortfolio.balance).to.equal(initialBalance);
        expect(userPortfolio.userType).to.equal(UserType.Individual);
    });

    it("should create a portfolio for an enterprise user", async function () {
        await digitalWealthManagement.connect(user).createPortfolio(initialBalance, UserType.Enterprise);

        const userPortfolio = await digitalWealthManagement.portfolios(user.address);
        expect(userPortfolio.owner).to.equal(user.address);
        expect(userPortfolio.balance).to.equal(initialBalance);
        expect(userPortfolio.userType).to.equal(UserType.Enterprise);
    });

    // it("should invest funds into a user's portfolio", async function () {
    //     await digitalWealthManagement.connect(user).createPortfolio(initialBalance, UserType.Individual);

    //     const amountToInvest = ethers.utils.parseEther("500");
    //     await digitalWealthManagement.connect(user).invest(amountToInvest);

    //     const userPortfolio = await digitalWealthManagement.portfolios(user.address);
    //     expect(userPortfolio.balance).to.equal(initialBalance.sub(amountToInvest));
    // });

    // it("should withdraw funds from a user's portfolio", async function () {
    //     await digitalWealthManagement.connect(user).createPortfolio(initialBalance, UserType.Individual);

    //     const amountToWithdraw = ethers.utils.parseEther("500");
    //     await digitalWealthManagement.connect(user).withdraw(amountToWithdraw);

    //     const userPortfolio = await digitalWealthManagement.portfolios(user.address);
    //     expect(userPortfolio.balance).to.equal(initialBalance.add(amountToWithdraw));
    // });
});

