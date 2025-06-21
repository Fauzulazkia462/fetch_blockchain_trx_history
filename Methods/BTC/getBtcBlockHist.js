const axios = require('axios');

async function getBtcBlockHist(blockHeight) {
    try {
        const blockHashRes = await axios.get(`https://blockstream.info/api/block-height/${blockHeight}`);
        const blockHash = blockHashRes.data;

        // const blockData = await axios.get(`https://blockstream.info/api/block/${blockHash}`);
        const txids = await axios.get(`https://blockstream.info/api/block/${blockHash}/txids`);

        const transactions = [];
        for (const txid of txids.data.slice(0, 50)) { // limit to 50 txs for speed
            const txData = await axios.get(`https://blockstream.info/api/tx/${txid}`);
            transactions.push(txData.data);
            await new Promise(r => setTimeout(r, 100)); // avoid rate limit
        }

        return transactions;
    } catch (err) {
        console.error('[BTC] Error fetching block data:', err.message);
        return [];
    }
}

module.exports = getBtcBlockHist;