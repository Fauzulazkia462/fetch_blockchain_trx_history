const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dayjs = require('dayjs');
require('dotenv').config();

const savePath = path.join(__dirname, '../Data/btcBlockchainTrxData.json');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBlockchainTrxHistoryBtc(address) {
    console.log('[BTC] Fetching transactions for:', address);
    try {
        // Get list of TXs from mempool.space API
        const baseUrl = 'https://mempool.space/api';
        const txsResponse = await axios.get(`${baseUrl}/address/${address}/txs`);
        const txs = txsResponse.data;

        const oneMonthAgo = dayjs().subtract(1, 'month');
        const filteredTxs = [];

        for (const tx of txs.slice(0, 10)) {
            await sleep(2000); // avoid rate limiting

            const txDetailResponse = await axios.get(`${baseUrl}/tx/${tx.txid}`);
            const txDetail = txDetailResponse.data;

            const txTime = txDetail.status?.block_time;
            if (!txTime || !dayjs.unix(txTime).isAfter(oneMonthAgo)) continue;

            filteredTxs.push({
                txid: tx.txid,
                time: txTime,
                inputs: txDetail.vin,
                outputs: txDetail.vout
            });
        }

        fs.writeFileSync(savePath, JSON.stringify(filteredTxs, null, 2));
        console.log('[BTC] Saved to:', savePath);

    } catch (err) {
        console.error('[BTC] Error fetching:', err.message);
    }
}

module.exports = getBlockchainTrxHistoryBtc;