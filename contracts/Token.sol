// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    string public name = "Jumcee";
    string public symbol = "JMC";
    uint8 public decimals = 18;
    
    uint256 public totalSupply;

    constructor() {
        totalSupply = 1000000000000000000000;
        balance[msg.sender] = totalSupply;
    }

    mapping(address => uint256) balance;

    function balanceOf(address account) external view returns(uint256) {
       return balance[account];
    }

    event Transfer(address owner, address recipient, uint amount);

    function transfer(address recipient, uint amount) external returns(bool) {
        require(balance[msg.sender] >= amount, "not enough balance");
        balance[msg.sender] -= amount;
        balance[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
}
