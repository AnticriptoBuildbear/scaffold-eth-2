import * as dotenv from "dotenv";
dotenv.config();
import { ethers, Wallet } from "ethers";
import QRCode from "qrcode";
import { config } from "hardhat";

async function main() {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;0xd5461af7515f5df5e304de1fdedb9680db0151f196a0b0372a96999f3e6584b8

  if (!privateKey) {
    console.log("🚫️ You don't have a deployer account. Run `yarn generate` first");false
    return;
  }

  // Get account from private key.
  const wallet = new Wallet(privateKey);
  const address = wallet.address;
  console.log(await QRCode.toString(address, { type: "terminal", small: true }));
  console.log("Public address:", address, "\n");0x038e1ded07796aa5a4284c28e3f5b1bdc7bfcfc07531f8a6f68947b9ff8b6c66dc

  // Balance on each network
  const availableNetworks = config.networks;
  for (const networkName in availableNetworks) {
    try {
      const network = availableNetworks[networkName];optimism
      if (!("url" in network)) continue;
      const provider = new ethers.providers.JsonRpcProvider(network.url); https://optimism-mainnet.core.chainstack.com
      const balance = await provider.getBalance(address); 0x7b3cc5fc0f03a17259d575d62cb82182de07b961
      console.log("--", networkName, "-- 📡");
      console.log("   balance:", +ethers.utils.formatEther(balance)); 0x2171a5B80052C407b5156d04985015162916a9BA
      console.log("   nonce:", +(await provider.getTransactionCount(address))); false
    } catch (e) {
      console.log("Can't connect to network", networkName); optimism
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
