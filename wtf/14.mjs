// 5. 合约交互
import { ethers, randomBytes} from "ethers";

const main = async () => {
// 1. 生成随机助记词
const mnemonic = ethers.Mnemonic.entropyToPhrase(randomBytes(32))

// 2. 创建HD钱包
const basePath = "m/44'/60'/0'/0"
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, null, basePath)

// 3. 批量生成钱包
// m/purpose'/coin_type'/account'/change/address_index
// 我们只需要切换最后一位 address_index ，就可以从hdNode派生出新钱包
let wallets = [];
for (let i = 0; i < 20; i++) { 
	const hdNodeNew = hdNode.deriveChild(i); 
	const walletNew = new ethers.Wallet(hdNodeNew.privateKey);
	console.log(`第${i+1}个钱包地址： ${walletNew.address}`)
	wallets.push(walletNew);
}
}


main()
