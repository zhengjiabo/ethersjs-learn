import { ethers } from "ethers";

// 利用 RPC 新建 provider 或者使用 ehters 内置的公共 RPC
// provider 可以进行链上查询操作
// provider.getBalance(address) 可以获取指定地址的余额

// const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
// const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
const provider = ethers.getDefaultProvider();
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
}
main()
