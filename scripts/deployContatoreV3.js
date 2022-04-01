// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const PROXY = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
async function main() {
  // We get the contract to deploy
  const ContatoreV3 = await ethers.getContractFactory("ContatoreV3");
  const proxyContatoreV3 = await upgrades.upgradeProxy(PROXY,ContatoreV3);
  await proxyContatoreV3.deployed();

  fs.writeFileSync(
    "./contatoreV3Config.js",
    `
  export const contatoreAddress = "${proxyContatoreV3.address}"
  `
  );

  console.log("Box deployed to:", proxyContatoreV3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
