pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ContatoreV2 is Initializable {
    uint256 public x;

    function initialize(uint256 _x) public initializer {
        x = _x;
    }

    function increaseValue(uint256 _x) public {
        x = x + _x;
    }

    function decreaseValue(uint256 _x) public {
        require(x >= _x);
        x = x + _x;
    }
}