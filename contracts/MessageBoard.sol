// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MessageBoard {
    string private message;
    address public lastSender;
    uint256 public lastUpdated;

    function setMessage(string memory _message) public {
        message = _message;
        lastSender = msg.sender;
        lastUpdated = block.timestamp;
    }

    function getMessage()
        public
        view
        returns (string memory, address, uint256)
    {
        return (message, lastSender, lastUpdated);
    }
}

