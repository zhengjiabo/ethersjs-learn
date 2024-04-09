import { ethers } from "ethers";

// const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
// const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
const provider = ethers.getDefaultProvider();
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
}
main()
