const { network, ethers } = require("hardhat")
const {developmentChains,VERIFICATION_BLOCK_CONFIRMATIONS,} = require("../helper-hardhat-config")

// const FUND_AMOUNT = ethers.utils.parseEther("1") // 1 Ether, or 1e18 (10^18) Wei

module.exports = async () => {
    const [deployer, voter1, voter2] = await ethers.getSigners();
    const chainId = network.config.chainId // на яку мережу деплой

    if (chainId == 31337) {
       
    } else {
       
    }
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const arguments = [
        
    ]
    const voting = await deploy("Voting", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Ensure the Raffle contract is a valid consumer of the VRFCoordinatorV2Mock contract.
    if (developmentChains.includes(network.name)) {
        
    }

    // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(voting.address, arguments)
    // }

    log("Enter voting with command:")
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`Contract address ${voting.address}`)
    log(`yarn hardhat run scripts/enterRaffle.js --network ${networkName}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "voting"]
