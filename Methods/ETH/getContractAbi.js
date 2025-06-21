const axios = require('axios');
require('dotenv').config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

async function getContractAbi(contractAddress) {
    console.log(`[ETH] Fetching ABI for contract: ${contractAddress}`);

    try {
        const response = await axios.get(ETHERSCAN_API_URL, {
            params: {
                module: 'contract',
                action: 'getabi',
                address: contractAddress,
                apikey: ETHERSCAN_API_KEY
            }
        });

        const { status, message, result } = response.data;

        if (status !== '1') {
            console.error(`[ETH] ABI fetch failed: ${message}`);
            return null;
        }

        const abi = JSON.parse(result);
        console.log(`[ETH] ABI successfully fetched for ${contractAddress}`);
        return abi;
    } catch (err) {
        console.error(`[ETH] Error fetching ABI for ${contractAddress}: ${err.message}`);
        return null;
    }
}

module.exports = getContractAbi;