const axios = require('axios');
require('dotenv').config();

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API_KEY}`;

async function getLatestBlockNumber() {
    const response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
    });
    return parseInt(response.data.result, 16);
}

async function getBlockByNumber(blockNumber) {
    const hexBlock = '0x' + blockNumber.toString(16);
    const response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [hexBlock, true], // include full tx objects
        id: 1
    });
    return response.data.result;
}

async function getTransactionReceipt(txHash) {
    const response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        params: [txHash],
        id: 1
    });
    return response.data.result;
}

async function getAllTrxHistory(N) {
    const latestBlock = await getLatestBlockNumber();
    console.log(`[ETH] Latest block: ${latestBlock}`);

    const allCombinedTxs = [];

    // fetch N blocks
    for (let i = latestBlock - N; i <= latestBlock; i++) {
        console.log(`[ETH] Fetching block ${i}`);
        try {
            const block = await getBlockByNumber(i);
            
            const transactions = block.transactions || [];
            
            for (const tx of transactions) {
                try {
                    const receipt = await getTransactionReceipt(tx.hash);
                   
                    // Combine tx and receipt for complete data
                    allCombinedTxs.push({
                        transactionHash: tx.hash,
                        logs: receipt ? receipt.logs : [],
                        txData: tx,
                        blockData: block,
                    });

                } catch (err) {
                    console.error(`[ETH] Error fetching receipt for tx ${tx.hash}: ${err.message}`);
                }

                // Delay to avoid rate limits
                await new Promise(res => setTimeout(res, 100));
            }

        } catch (err) {
            console.error(`[ETH] Error fetching block ${i}: ${err.message}`);
        }
    }

    return allCombinedTxs;
}

module.exports = getAllTrxHistory;