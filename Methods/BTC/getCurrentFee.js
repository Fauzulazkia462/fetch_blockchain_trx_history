const axios = require('axios');

async function getBtcCurrentFee() {
    try {
        const res = await axios.get('https://mempool.space/api/v1/fees/recommended');
        return {
            fastestFee: res.data.fastestFee,
            halfHourFee: res.data.halfHourFee,
            hourFee: res.data.hourFee
        };
    } catch (err) {
        console.error('[BTC] Error fetching current fee:', err.message);
        return null;
    }
}

module.exports = getBtcCurrentFee;