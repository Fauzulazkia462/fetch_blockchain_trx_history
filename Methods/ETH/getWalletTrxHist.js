const axios = require('axios');
require('dotenv').config();

const getBlockByNumber = require("../../Utils/ETH/getBlockByNumber");
const getTransactionReceipt = require("../../Utils/ETH/getTransactionReceipt");

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API_KEY}`;

async function getEthWalletHistory(walletAddress, blockRange = 100) {
    const result = [];
    console.log(`[ETH] Scanning last ${blockRange} blocks for wallet ${walletAddress}...`);

    try {
        const latestBlockRes = await axios.post(ALCHEMY_URL, {
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
            id: 1
        });
        const latestBlock = parseInt(latestBlockRes.data.result, 16);

        for (let i = latestBlock - blockRange + 1; i <= latestBlock; i++) {
            const block = await getBlockByNumber(i);
            const txs = block?.transactions || [];

            for (const tx of txs) {
                if (tx.from?.toLowerCase() === walletAddress.toLowerCase() ||
                    tx.to?.toLowerCase() === walletAddress.toLowerCase()) {

                    try {
                        const receipt = await getTransactionReceipt(tx.hash);
                        result.push({
                            transactionHash: tx.hash,
                            blockNumber: block.number,
                            blockTimestamp: block.timestamp,
                            from: tx.from,
                            to: tx.to,
                            value: tx.value,
                            gas: tx.gas,
                            gasPrice: tx.gasPrice,
                            nonce: tx.nonce,
                            input: tx.input,
                            txType: tx.type,
                            receiptStatus: receipt.status,
                            contractAddress: receipt.contractAddress,
                            cumulativeGasUsed: receipt.cumulativeGasUsed,
                            effectiveGasPrice: receipt.effectiveGasPrice,
                            gasUsed: receipt.gasUsed,
                            emittedEvents: receipt.logs
                        });

                        await new Promise((res) => setTimeout(res, 100)); // delay for rate limiting
                    } catch (err) {
                        console.error(`[ETH] Receipt error for tx ${tx.hash}:`, err.message);
                    }
                }
            }

            console.log(`[ETH] Scanned block ${i}`);
        }

    } catch (err) {
        console.error(`[ETH] Error during wallet history scan:`, err.message);
    }

    return result;
}

module.exports = getEthWalletHistory;