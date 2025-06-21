const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

async function storeContractAbi(abiArray, outputPath = './eth_contract_abi.csv') {
    try {
        if (!abiArray || abiArray.length === 0) {
            console.warn('[CSV] No ABI data to write.');
            return;
        }

        // Flatten each ABI entry for CSV
        const flatAbi = abiArray.map((entry) => ({
            type: entry.type || '',
            name: entry.name || '',
            stateMutability: entry.stateMutability || '',
            inputs: JSON.stringify(entry.inputs || []),
            outputs: JSON.stringify(entry.outputs || []),
            anonymous: entry.anonymous !== undefined ? entry.anonymous : ''
        }));

        const fields = Object.keys(flatAbi[0]);
        const opts = { fields };

        const parser = new Parser(opts);
        const csv = parser.parse(flatAbi);

        const filePath = path.resolve(outputPath);
        fs.writeFileSync(filePath, csv, 'utf8');
        console.log(`[CSV] Contract ABI saved to ${filePath}`);
    } catch (error) {
        console.error('[CSV] Error writing ABI to CSV:', error.message);
    }
}

module.exports = storeContractAbi;