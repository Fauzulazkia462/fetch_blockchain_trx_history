const axios = require('axios');
require('dotenv').config();

const ALCHEMY_SOL = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_SOL_API_KEY}`;

async function getLatestSlot() {
    const res = await axios.post(ALCHEMY_SOL, {
        jsonrpc: "2.0",
        id: 1,
        method: "getSlot",
        params: []
    });
    return res.data.result;
}

async function getBlockBySlot(slot) {
    const res = await axios.post(ALCHEMY_SOL, {
        jsonrpc: "2.0",
        id: 1,
        method: "getBlock",
        params: [
            slot,
            {
                transactionDetails: "full",
                rewards: false,
                maxSupportedTransactionVersion: 0
            }
        ]
    });
    return res.data.result;
}

async function getAllTrxHistorySol(N) {
    const latestSlot = await getLatestSlot();
    console.log(`[SOL] Latest slot: ${latestSlot}`);

    const allTxs = [];

    for (let slot = latestSlot - N; slot <= latestSlot; slot++) {
        console.log(`[SOL] Fetching slot ${slot}`);
        try {
            const block = await getBlockBySlot(slot);
            
            if (!block || !block.transactions) continue;

            for (const tx of block.transactions) {
                allTxs.push({
                    transactionHash: tx.transaction.signatures[0],
                    blockData: block,
                    txData: tx
                });
            }

        } catch (err) {
            console.error(`[SOL] Error fetching slot ${slot}: ${err.message}`);
        }

        await new Promise(res => setTimeout(res, 100)); // avoid rate limits
    }

    return allTxs;
}

module.exports = getAllTrxHistorySol;