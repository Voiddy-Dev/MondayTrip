// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import { TripPlanner } from "src/TripPlanner.sol";

contract Deploy is Script {
    address private create2addrPlanner;

    enum Chains {
        LineaGoerli,
        BaseGoerli,
        ScrollSepolia,
        CeloAlfajores,
        MantleTestnet,
        Anvil
    }

    enum Cycle {
        Dev,
        Local
    }

    mapping(Chains chains => string rpcUrls) public forks;
    uint256 public deployerPrivateKey;

    bytes32 internal plannerSalt;

    modifier setEnvDeploy(Cycle cycle) {
        if (cycle == Cycle.Dev) {
            deployerPrivateKey = vm.envUint("DEPLOYER_KEY");
        } else {
            deployerPrivateKey = vm.envUint("LOCAL_KEY");
        }

        _;
    }

    modifier broadcast(uint256 pk) {
        vm.startBroadcast(pk);

        _;

        vm.stopBroadcast();
    }

    /// @dev Compute the CREATE2 addresses for contracts (proxy, counter).
    /// @param saltCounter The salt for the counter contract.
    modifier computeCreate2(bytes32 saltCounter) {
        create2addrPlanner =
            computeCreate2Address(saltCounter, hashInitCode(type(TripPlanner).creationCode));

        _;
    }

    function setUp() public {
        // Testnet
        forks[Chains.BaseGoerli] = "baseGoerli";
        forks[Chains.LineaGoerli] = "lineaGoerli";
        forks[Chains.MantleTestnet] = "mantleTestnet";
        forks[Chains.CeloAlfajores] = "celoAlfajores";
        forks[Chains.ScrollSepolia] = "scrollSepolia";

        // Local
        forks[Chains.Anvil] = "anvil";
    }

    function run() public {
        vm.broadcast();
    }

    function deployTestnet(uint256 _plannerSalt) public setEnvDeploy(Cycle.Dev) {
        Chains[] memory deployForks = new Chains[](5);

        plannerSalt = bytes32(_plannerSalt);

        deployForks[0] = Chains.BaseGoerli;
        deployForks[1] = Chains.LineaGoerli;
        deployForks[2] = Chains.MantleTestnet;
        deployForks[3] = Chains.CeloAlfajores;
        deployForks[4] = Chains.ScrollSepolia;

        createDeployMultichain(deployForks);
    }

    function deployLocal() external setEnvDeploy(Cycle.Local) {
        Chains[] memory deployForks = new Chains[](1);
        plannerSalt = bytes32(uint256(2));

        deployForks[0] = Chains.Anvil;

        createDeployMultichain(deployForks);
    }

    function createFork(Chains chain) public {
        vm.createFork(forks[chain]);
    }

    function createSelectFork(Chains chain) public {
        vm.createSelectFork(forks[chain]);
    }

    function createDeployMultichain(Chains[] memory deployForks)
        private
        computeCreate2(plannerSalt)
    {
        for (uint256 i; i < deployForks.length;) {
            console2.log("Deploying TripPlanner to chain: ", uint256(deployForks[i]), "\n");

            createSelectFork(deployForks[i]);

            chainDeployPlanner();

            unchecked {
                ++i;
            }
        }
    }

    function chainDeployPlanner() private broadcast(deployerPrivateKey) {
        TripPlanner planner = new TripPlanner{salt: plannerSalt}();

        require(create2addrPlanner == address(planner), "Address mismatch Counter");

        console2.log("Planner address:", address(planner), "\n");
    }
}
