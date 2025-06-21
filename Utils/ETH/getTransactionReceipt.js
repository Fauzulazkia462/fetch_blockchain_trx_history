const axios = require('axios');
require('dotenv').config();

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API_KEY}`;

async function getTransactionReceipt(txHash) {
    const response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        params: [txHash],
        id: 1
    });
    return response.data.result;
}

module.exports = getTransactionReceipt;