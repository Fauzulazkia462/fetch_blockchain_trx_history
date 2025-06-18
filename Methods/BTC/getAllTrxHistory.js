const axios = require('axios');

const MEMPOOL_API = 'https://mempool.space/api';

async function getLatestBTCBlockHeight() {
    const response = await axios.get(`${MEMPOOL_API}/blocks`);
    return response.data[0].height;
}

async function getBTCBlockByHeight(height) {
    const response = await axios.get(`${MEMPOOL_API}/block-height/${height}`);
    const blockHash = response.data;
    const blockResponse = await axios.get(`${MEMPOOL_API}/block/${blockHash}`);
    return blockResponse.data;
}

async function getBTCBlockTxs(blockHash) {
    const txsResponse = await axios.get(`${MEMPOOL_API}/block/${blockHash}/txs`);
    return txsResponse.data;
}

async function getAllBTCTrxHistory(N) {
    const latestHeight = await getLatestBTCBlockHeight();
    console.log(`[BTC] Latest block height: ${latestHeight}`);

    const allBTCTransactions = [];

    for (let i = latestHeight - N; i <= latestHeight; i++) {
        console.log(`[BTC] Fetching block at height ${i}`);
        try {
            const block = await getBTCBlockByHeight(i);
            console.log(`[BTC] Block ID (hash): ${block.id}`);

            const txs = await getBTCBlockTxs(block.id);
            console.log(`[BTC] Found ${txs.length} txs in block ${i}`);

            for (const tx of txs) {
                allBTCTransactions.push({
                    transactionHash: tx.txid,
                    txData: tx,
                    blockData: block
                });
            }

            await new Promise(res => setTimeout(res, 200));
        } catch (err) {
            console.error(`[BTC] Error fetching block at height ${i}:`, err.message || err);
        }
    }

    return allBTCTransactions;
}

module.exports = getAllBTCTrxHistory;