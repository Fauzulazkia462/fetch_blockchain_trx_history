const axios = require('axios');

async function getBtcWalletTrxHistory(address) {
    try {
        const res = await axios.get(`https://blockstream.info/api/address/${address}/txs`);
        return res.data;
    } catch (err) {
        console.error('[BTC] Error fetching wallet txs:', err.message);
        return [];
    }
}

module.exports = getBtcWalletTrxHistory;