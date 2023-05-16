const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  console.log(`Deeploy contract...`)
  const c = await Voting.deploy(['Vitalii', 'Kovtun'], 10);
  await c.deployed();
  console.log(`Deployed! Address: ${c.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
