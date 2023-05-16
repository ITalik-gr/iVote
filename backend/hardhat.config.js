require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
    },
  },

  // namedAccounts: {
  //   deployer: {
  //     default: 0, // Вказати індекс вашого адресу розгортання контракту
  //   },
  // },
  paths: {
    // Шляхи до контрактів та дефініцій контрактів
    // sources: './contracts',
    // deployments: './deployments',
    // imports: './imports',
  },
  // Додайте розширення hardhat-deploy та hardhat-deploy-ethers
  // для автоматичного розгортання контрактів та збереження дефініцій контрактів
  // з адресами та ABI.
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // Розширення hardhat-deploy та hardhat-deploy-ethers
  // для автоматичного розгортання контрактів та збереження дефініцій контрактів
  // з адресами та ABI.
  // paths: {
  //   artifacts: './src/artifacts',
  // },
  // dotenv: {
  //   path: '.env',
  // },
};
