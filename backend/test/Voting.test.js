const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Voting Unit Tests", function () {
      let vote, voteContract, account1, deployer
      let accounts = [];

      beforeEach(async () => {
        accounts = await ethers.getSigners() // could also do with getNamedAccounts
        deployer = accounts[0]
        account1 = accounts[1]

        await deployments.fixture(["votee"]) // Deploys modules with the tags "mocks" and "raffle"

        voteContract = await ethers.getContract("Voting") // Returns a new connection to the Raffle contract
        vote = voteContract.connect(account1) // Returns a new instance of the Raffle contract connected to player
    })

    describe("Deploy", function () {
      it("a", async function() {
        const i_owner = (await vote.i_owner())
        console.log(i_owner);
        assert.equal(deployer.address, i_owner)
      })
    })
  }) 