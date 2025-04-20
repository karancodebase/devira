import hardhat from "hardhat";

async function main() {
  const { ethers } = hardhat;  // Access ethers from the imported `hardhat` object
  const StreakBadgeNFT = await ethers.getContractFactory("StreakBadgeNFT");
  const contract = await StreakBadgeNFT.deploy();

  await contract.deployed();

  console.log("StreakBadgeNFT deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
