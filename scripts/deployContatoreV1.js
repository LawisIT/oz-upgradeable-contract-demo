// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

async function main() {
  // We get the contract to deploy
  const Contatore = await ethers.getContractFactory("Contatore");
  const proxyContatore = await upgrades.deployProxy(Contatore, [10], {
    inizializer: "inizialize",
  });
  await proxyContatore.deployed();

  fs.writeFileSync(
    "./contatoreConfig.js",
    `
  export const contatoreAddress = "${proxyContatore.address}"
  `
  );

  console.log("Box deployed to:", proxyContatore.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
