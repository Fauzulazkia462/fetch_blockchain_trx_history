const axios = require('axios');

const SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com';

async function getCurrentSolanaFee() {
    try {
        // Step 1: Get recent blockhash
        const blockhashRes = await axios.post(SOLANA_RPC_URL, {
            jsonrpc: "2.0",
            id: 1,
            method: "getLatestBlockhash",
            params: []
        });

        const blockhash = blockhashRes?.data?.result?.value?.blockhash;
        if (!blockhash) {
            console.error("[SOL] Failed to get blockhash");
            return null;
        }

        // Step 2: Build message object (base64-encoded empty transaction)
        // NOTE: This simulates a message with only one signature (payer-only tx)
        const message = {
            recentBlockhash: blockhash,
            instructions: [],
            payer: "11111111111111111111111111111111"
        };

        const messageRes = await axios.post(SOLANA_RPC_URL, {
            jsonrpc: "2.0",
            id: 1,
            method: "getFeeForMessage",
            params: [message]
        });

        const fee = messageRes?.data?.result?.value;

        if (!fee) {
            console.error("[SOL] Failed to get fee from message response:", JSON.stringify(messageRes.data, null, 2));
            return null;
        }

        return {
            lamportsPerSignature: fee
        };
    } catch (error) {
        console.error("[SOL] Error fetching fee info:", error.message);
        return null;
    }
}

module.exports = getCurrentSolanaFee;
