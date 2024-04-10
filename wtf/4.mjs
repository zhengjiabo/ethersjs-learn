import { ethers } from "ethers";

const main = async () => {
    // 利用infura的rpc节点连接以太坊测试网络
    const SEPOLIA_URL = 'https://sepolia.infura.io/v3/bcd1e76b5e094505a53c4a44acdfd627';
    const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

    // 创建随机的wallet对象
    console.group("wallet1")
    const wallet1 = ethers.Wallet.createRandom()
    console.log("🚀 ~ main ~ wallet1:", wallet1)
    const mnemonic = wallet1.mnemonic // 获取助记词
    console.log("🚀 ~ main ~ wallet1.privateKey:", wallet1.privateKey)
    console.log("🚀 ~ main ~ mnemonic:", mnemonic)
    console.log("🚀 ~ main ~ mnemonic.phrase:", mnemonic?.phrase)

    const wallet1WithProvider = wallet1.connect(provider) // 连接provider(网络)的钱包
    console.log("🚀 ~ main ~ wallet1WithProvider:", wallet1WithProvider)
    console.groupEnd()
    
    // 利用私钥和provider创建wallet对象
    console.group("wallet2")
    const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
    const wallet2 = new ethers.Wallet(privateKey, provider)
    const mnemonic2 = wallet2.mnemonic // 获取助记词  私钥登录的没有
    console.log("🚀 ~ main ~ wallet2.privateKey:", wallet2.privateKey)
    console.log("🚀 ~ main ~ mnemonic2:", mnemonic2)
    console.log("🚀 ~ main ~ mnemonic.phrase:", mnemonic2?.phrase)
    const wallet2WithProvider = wallet2.connect(provider) // 连接provider(网络)的钱包
    console.log("🚀 ~ main ~ wallet2WithProvider:", wallet2WithProvider)
    console.groupEnd()

    // 从助记词创建wallet对象
    console.group("wallet3")
    const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)
    console.log("🚀 ~ main ~ wallet1.privateKey:", wallet1.privateKey)
    console.groupEnd()

    // 利用getAddress()函数获取钱包地址
    console.group("getAddress")
    const address1 = await wallet1.getAddress()
    const address2 = await wallet2.getAddress()
    const address3 = await wallet3.getAddress()
    console.log("🚀 ~ main ~ address1:", address1)
    console.log("🚀 ~ main ~ address2:", address2)
    console.log("🚀 ~ main ~ address3:", address3)
    console.log("🚀 ~ main ~ address1 === address3:", address1 === address3)
    console.groupEnd()

    // 利用getTransactionCount()函数获取钱包在链上的交互次数。
    console.group("getTransactionCount - Nonce")
    // const txCount1 = await provider.getTransactionCount(wallet1) // 可以用连接provider(网络)的钱包
    // const txCount2 = await provider.getTransactionCount(wallet2WithProvider) // 也可以用连接provider(网络)的钱包
    // console.log("🚀 ~ main ~ txCount1:", txCount1)
    // console.log("🚀 ~ main ~ txCount2:", txCount2)
    console.groupEnd()

    console.group("getBalance")
    console.log(`i. 发送前余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2WithProvider))} ETH`)
    console.groupEnd()
}


main()
