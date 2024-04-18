// 5. 合约交互
import { ethers, randomBytes} from "ethers";

const main = async () => {
    // 1. 生成随机助记词
    const mnemonic = ethers.Mnemonic.entropyToPhrase(randomBytes(32))

    // 2. 创建HD钱包
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic)

    // 3. 批量生成钱包
    // 派生路径：m / purpose 44 / coin_type 代币类型 / account 账户索引，从0开始 / change 外链 0 / address_index 地址索引，从0开始 
    // 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
    let wallets = [];
    const account = hdNode.derivePath("m/44'/60'/0'/0");
    for (let i = 0; i < 20; i++) { 
        const hdNodeNew = account.derivePath("/" + i); 
        const walletNew = new ethers.Wallet(hdNodeNew.privateKey);
        console.log(`第${i+1}个钱包地址： ${walletNew.address}`)
        wallets.push(walletNew);
    }
}


main()
