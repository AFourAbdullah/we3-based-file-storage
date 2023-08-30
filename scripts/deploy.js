const hre = require("hardhat");
const { verify } = require("../utils/verify");

async function main() {
  const FileStorage = await hre.ethers.getContractFactory("FileStorage");
  const fileStorage = await FileStorage.deploy();

  await fileStorage.deployed();

  console.log(`File Storage Contract deployed to ${fileStorage.address}`);
  await verify(fileStorage.address, []);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
