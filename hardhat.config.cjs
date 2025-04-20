/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@typechain/hardhat");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrumTestnet: {
      url: process.env.ARBITRUM_SEPOLIA_RPC_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      chainId: 421614
    },
    arbitrumMainnet: {
      url: process.env.ARBITRUM_MAINNET_RPC_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      chainId: 42161
    }
  },
  etherscan: { apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "arbitrumTestnet",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io"
        }
      }
    ]
  },
  typechain: {
    outDir: "typechain",
    target: "ethers",
  },
};
