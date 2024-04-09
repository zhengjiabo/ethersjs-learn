import { ethers } from "ethers";

const main = async () => {
    const PROVATE_RPC = 'https://mainnet.infura.io/v3/bcd1e76b5e094505a53c4a44acdfd627'
    /* 公共 RPC链接公网 */
    const CHAIN_LIST_RPC = 'https://eth.llamarpc.com'
    const provider = new ethers.JsonRpcProvider(CHAIN_LIST_RPC)

    /* 查询余额 */
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);


    /* 查询链 */
    const network = await provider.getNetwork();
    console.log(`Current network: `, network.toJSON());

    /* 查询区块高度 */
    const blockNumber = await provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);

    // 4. 查询 vitalik 钱包历史交易次数
    const transactionCount = await provider.getTransactionCount(`vitalik.eth`);
    console.log(`Transaction count of vitalik: ${transactionCount}`);

    // 5. 查询当前建议的gas设置 feeData
    const feeData = await provider.getFeeData();
    console.log(`Current suggested fee data: `, feeData);

     // 6. 查询区块信息
     const block = await provider.getBlock(blockNumber)
     console.log(`Block information: `, block);

    // 7. 给定合约地址查询合约bytecode，例子用的WETH地址
    const code = await provider.getCode(`0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`);
    console.log(`WETH contract bytecode: `, code);
}

main()
