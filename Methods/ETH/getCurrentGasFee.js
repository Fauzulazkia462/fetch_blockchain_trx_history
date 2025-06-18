const axios = require('axios');
require('dotenv').config();

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API_KEY}`;

async function getCurrentGasFee() {
    try {
        // Legacy gas price
        const gasPriceRes = await axios.post(ALCHEMY_URL, {
            jsonrpc: "2.0",
            method: "eth_gasPrice",
            params: [],
            id: 1
        });
        const gasPrice = parseInt(gasPriceRes.data.result, 16);

        // EIP-1559 Fee: base fee + priority fee
        const feeHistoryRes = await axios.post(ALCHEMY_URL, {
            jsonrpc: "2.0",
            method: "eth_feeHistory",
            params: ["0x1", "latest", [50]], // last block, percentile 50
            id: 1
        });

        const baseFee = parseInt(feeHistoryRes.data.result.baseFeePerGas[0], 16);
        const priorityFee = parseInt(feeHistoryRes.data.result.reward[0][0], 16); // 50th percentile priority tip

        const maxFeePerGas = baseFee + priorityFee;

        return {
            gasPrice,              // Legacy gas price (wei)
            baseFeePerGas: baseFee,
            maxPriorityFeePerGas: priorityFee,
            maxFeePerGas
        };
    } catch (error) {
        console.error("[ETH] Error fetching gas Fee:", error.message);
        return null;
    }
}

module.exports = getCurrentGasFee;