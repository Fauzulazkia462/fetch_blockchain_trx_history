const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dayjs = require('dayjs');
require('dotenv').config();

const savePath = path.join(__dirname, '../Data/ethBlockchainTrxData.json');

async function getBlockchainTrxHistoryEth(address) {
    const toTimestamp = Math.floor(Date.now() / 1000);
    const fromTimestamp = dayjs().subtract(1, 'month').unix();

    console.log('[ETH] Fetching transactions for:', address);
    try {
        const response = await axios.post(
            `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API_KEY}`,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "alchemy_getAssetTransfers",
                params: [
                    {
                        fromBlock: "0x0",
                        toBlock: "latest",
                        toAddress: address,
                        category: ["external", "erc20", "erc721"],
                    }
                ]
            }
        );

        const txs = response.data.result.transfers.filter(tx =>
            dayjs(tx.blockTimestamp).unix() >= fromTimestamp
        );

        fs.writeFileSync(savePath, JSON.stringify(txs, null, 2));
        console.log('[ETH] Saved to:', savePath);
    } catch (err) {
        console.error('[ETH] Error fetching:', err.message);
    }
}

module.exports = getBlockchainTrxHistoryEth;
