// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/************************************************************************************************************************** */
/* 
This is a comrehensive smart contract for Digital Wealth Management.
This template can be used at individual level as well as enterprise level by selecting the appropriate UserType
*/
/************************************************************************************************************************** */

contract DigitalWealthManagement {
    address public owner;
    uint256 public totalAssetsUnderManagement;

    enum UserType { Individual, Enterprise }

    struct Portfolio {
        address owner;
        uint256 balance;
        UserType userType;
        // Include additional data like asset allocation, investment strategies, etc.
    }

    mapping(address => Portfolio) public portfolios;

    event PortfolioCreated(address indexed owner, uint256 initialBalance, UserType userType);
    event CheckBalance(string text, uint amount);

    constructor() {
        owner = msg.sender;
    }

    // Create an investment portfolio for an individual or enterprise
    function createPortfolio(uint256 initialBalance, UserType userType) external {
        require(userType == UserType.Individual || userType == UserType.Enterprise, "Invalid user type.");
        require(portfolios[msg.sender].owner == address(0), "Portfolio already exists for the user.");
        portfolios[msg.sender] = Portfolio(msg.sender, initialBalance, userType);
        totalAssetsUnderManagement += initialBalance;
        emit PortfolioCreated(msg.sender, initialBalance, userType);
    }

    // Invest funds from a user's portfolio
    function invest(uint256 amount) external {
        require(portfolios[msg.sender].balance >= amount, "Insufficient funds in the portfolio.");
        // Implement investment logic, e.g., buying assets or placing orders in financial markets
    }

    // Withdraw funds from a user's portfolio
    function withdraw(uint256 amount) external {
        require(portfolios[msg.sender].balance >= amount, "Insufficient funds in the portfolio.");
        // Implement withdrawal logic, e.g., selling assets or executing withdrawal requests
    }
    
    function getBalance(address user_account) external returns (uint){
    
       string memory data = "User Balance is : ";
       uint user_bal = user_account.balance;
       emit CheckBalance(data, user_bal );
       return (user_bal);

    }
}
