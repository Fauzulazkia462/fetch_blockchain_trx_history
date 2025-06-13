const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const savePath = path.join(__dirname, '../Data/solBlockchainTrxData.json');

async function getBlockchainTrxHistorySol(address) {
    console.log('[SOL] Fetching transactions for:', address);

    const endpoint = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_SOL_API_KEY}`;

    try {
        // Step 1: Get latest 50 transaction signatures
        const sigResponse = await axios.post(endpoint, {
            jsonrpc: "2.0",
            id: 1,
            method: "getSignaturesForAddress",
            params: [address, { limit: 50 }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const signatures = sigResponse.data.result;

        if (!signatures || signatures.length === 0) {
            console.log('[SOL] No transaction signatures found');
            fs.writeFileSync(savePath, JSON.stringify([], null, 2));
            return;
        }

        // Step 2: Fetch full transactions
        const transactions = [];

        for (const sigObj of signatures) {
            const txResponse = await axios.post(endpoint, {
                jsonrpc: "2.0",
                id: 1,
                method: "getTransaction",
                params: [sigObj.signature, { encoding: "jsonParsed" }]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (txResponse.data.result) {
                transactions.push(txResponse.data.result);
            }
        }

        fs.writeFileSync(savePath, JSON.stringify(transactions, null, 2));
        console.log('[SOL] Saved to:', savePath);

    } catch (err) {
        console.error('[SOL] Error fetching:', err.message);
    }
}

module.exports = getBlockchainTrxHistorySol;