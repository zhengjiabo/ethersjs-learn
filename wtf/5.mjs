// 5. 合约交互
import { ethers } from "ethers";

const main = async () => {
    // 可写合约 signer 可以是 wallet 或 provider
    // const contract = new ethers.Contract(address, abi, signer)

    // 将可读合约转换为可写合约
    // const contract2 = contract.connect(signer)


    // 利用infura的rpc节点连接以太坊测试网络
    const SEPOLIA_URL = '';
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
    const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775f593b6f2b'
    const wallet2 = new ethers.Wallet(privateKey, provider)
    const mnemonic2 = wallet2.mnemonic // 获取助记词  私钥登录的没有
    console.log("🚀 ~ main ~ wallet2.privateKey:", wallet2.privateKey)
    console.log("🚀 ~ main ~ mnemonic2:", mnemonic2)
    console.log("🚀 ~ main ~ mnemonic.phrase:", mnemonic2?.phrase) 
    console.groupEnd()

    // 从助记词创建wallet对象
    console.group("wallet3")
    const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)
    console.log("🚀 ~ main ~ wallet1.privateKey:", wallet1.privateKey)
    console.groupEnd()


    // 建交易账号
    console.group("wallet4")
    const wallet4 = new ethers.Wallet('0x415005437fb9208f8a75571f8d2d6dbc18b39f4eb78ea788b93008b20525ed35', provider)
    console.log("🚀 ~ main ~ wallet4.privateKey:", wallet4.privateKey)
    console.groupEnd()

    // 利用getAddress()函数获取钱包地址
    console.group("getAddress")
    const address1 = await wallet1.getAddress()
    const address2 = await wallet2.getAddress()
    const address3 = await wallet3.getAddress()
    const address4 = await wallet4.getAddress()
    console.log("🚀 ~ main ~ address1:", address1)
    console.log("🚀 ~ main ~ address2:", address2)
    console.log("🚀 ~ main ~ address3:", address3)
    console.log("🚀 ~ main ~ address1 === address3:", address1 === address3)
    console.log("🚀 ~ main ~ address4:", address4)
    console.groupEnd()

    // 利用getTransactionCount()函数获取钱包在链上的交互次数。
    console.group("getTransactionCount - Nonce")
    const txCount1 = await provider.getTransactionCount(wallet1WithProvider) // 用已连接provider(网络)的钱包
    const txCount2 = await provider.getTransactionCount(wallet2)
    console.log("🚀 ~ main ~ txCount2:", txCount1)
    console.log("🚀 ~ main ~ txCount4:", txCount2)
    console.groupEnd()

    console.log(`i. 发送前余额`)
    let balance = await provider.getBalance(wallet2)
    const wallet2BalanceBefore = ethers.formatEther(balance)
    console.log(`钱包2: ${wallet2BalanceBefore} ETH`)

    balance = await provider.getBalance(wallet4)
    const wallet4BalanceBefore = ethers.formatEther(balance)
    console.log(`钱包4: ${wallet4BalanceBefore} ETH`)

    console.log(`ii. 构建交易，to接受地址、value 转账金额. `)
    const tx = {
        to: address4,
        value: ethers.parseEther('0.001')
    }
    const receipt = await wallet2.sendTransaction(tx) // 发送交易
    console.log('iii. 发起交易并等待区块链确认')
    console.log("🚀 ~ main ~ before await receipt:", receipt)
    await receipt.wait() // 等待交易确认
    console.log("🚀 ~ main ~ after await receipt:", receipt)

    console.log(`iv. 发送后余额`)
    balance = await provider.getBalance(wallet2)
    const wallet2BalanceAfter = ethers.formatEther(balance)
    console.log(`钱包2: ${wallet2BalanceAfter} ETH`)

    balance = await provider.getBalance(wallet4)
    const wallet4BalanceAfter = ethers.formatEther(balance)
    console.log(`钱包4: ${wallet4BalanceAfter} ETH`)



}


main()
