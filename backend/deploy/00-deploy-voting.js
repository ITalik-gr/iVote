const { network, ethers } = require("hardhat")
const {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")

module.exports = async ({deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // const chainId = network.config.chainId

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const arguments = [
        ['Vitalii', 'Kovtun'],
        60
    ]
    const vote = await deploy("Voting", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(raffle.address, arguments)
    // }

    log("Contract deployed succsess")
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`Network: ${networkName}`)
    log(`Address: ${vote.address}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "vote"]