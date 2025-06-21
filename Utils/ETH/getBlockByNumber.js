const axios = require('axios');
require('dotenv').config();

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API_KEY}`;

async function getBlockByNumber(blockNumber) {
    const hexBlock = '0x' + blockNumber.toString(16);
    const response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [hexBlock, true],
        id: 1
    });
    return response.data.result;
}

module.exports = getBlockByNumber;