// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Counter {
    uint256 private count;

    event CounterIncremented(uint256 value);

    function getCount() public view returns (uint256) {
        return count;
    }

    function increment() public {
        count++;
        emit CounterIncremented(count);
    }
}
