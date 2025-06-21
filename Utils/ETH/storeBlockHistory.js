const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const flattenTxData = require('./flattenTxDataForCsv');

async function storeBlockData(data, outputPath = './eth_block_training_data.csv') {
    try {
        if (!data || data.length === 0) {
            console.warn('[CSV] No data to write.');
            return;
        }

        const flatData = data.map(flattenTxData);

        const fields = Object.keys(flatData[0]);
        const opts = { fields };

        const parser = new Parser(opts);
        const csv = parser.parse(flatData);

        const filePath = path.resolve(outputPath);
        fs.writeFileSync(filePath, csv, 'utf8');
        console.log(`[CSV] Data saved to ${filePath}`);
    } catch (error) {
        console.error('[CSV] Error writing to CSV:', error.message);
    }
}

module.exports = storeBlockData;