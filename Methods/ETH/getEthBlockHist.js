const axios = require('axios');
require('dotenv').config();

const getBlockByNumber = require("../../Utils/ETH/getBlockByNumber");
const getTransactionReceipt = require("../../Utils/ETH/getTransactionReceipt");

async function getEthBlockHist(blockNumber) {
    console.log(`[ETH] Fetching block ${blockNumber} for training data`);
    const trainingData = [];

    try {
        const block = await getBlockByNumber(blockNumber);
        const transactions = block.transactions || [];

        for (const tx of transactions) {
            try {
                const receipt = await getTransactionReceipt(tx.hash);
                trainingData.push({
                    transactionHash: tx.hash,
                    blockNumber: block.number,
                    blockTimestamp: block.timestamp,
                    from: tx.from,
                    to: tx.to,
                    value: tx.value,
                    gas: tx.gas,
                    gasPrice: tx.gasPrice,
                    nonce: tx.nonce,
                    input: tx.input,
                    txType: tx.type,
                    receiptStatus: receipt.status,
                    contractAddress: receipt.contractAddress,
                    cumulativeGasUsed: receipt.cumulativeGasUsed,
                    effectiveGasPrice: receipt.effectiveGasPrice,
                    gasUsed: receipt.gasUsed,
                    emittedEvents: receipt.logs
                });

                // Delay to avoid rate limits
                await new Promise(res => setTimeout(res, 100));
            } catch (err) {
                console.error(`[ETH] Error fetching receipt for tx ${tx.hash}: ${err.message}`);
            }
        }
    } catch (err) {
        console.error(`[ETH] Error fetching block ${blockNumber}: ${err.message}`);
    }

    return trainingData;
}

module.exports = getEthBlockHist;