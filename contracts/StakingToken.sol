// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ERC20 token
 * @author Nox
 * @notice This contract is for creating an ERC20 token
 */
contract StakingToken is ERC20 {
    /// @notice Creating ERC20 Token contract to use in our Constant Sum AMM
    constructor() ERC20("Test Staking Token 0", "TS0") {
        _mint(msg.sender, 1000000000000000000000000000);
    }

    /**
     * @notice allow any one to mint any amount of tokens
     *
     * @param _amount amount of the token to be minted
     */
    function mint(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}
