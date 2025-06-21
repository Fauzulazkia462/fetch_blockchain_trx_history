const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

function flattenBtcTx(tx) {
    return {
        txid: tx.txid,
        version: tx.version,
        locktime: tx.locktime,
        size: tx.size,
        weight: tx.weight,
        fee: tx.fee || null,
        vin_count: tx.vin.length,
        vout_count: tx.vout.length
    };
}

async function storeBtcBlockHist(data, outputPath = './btc_block_data.csv') {
    try {
        const flatData = data.map(flattenBtcTx);
        const parser = new Parser({ fields: Object.keys(flatData[0]) });
        const csv = parser.parse(flatData);
        fs.writeFileSync(path.resolve(outputPath), csv, 'utf8');
        console.log(`[CSV] BTC block history saved to ${outputPath}`);
    } catch (err) {
        console.error('[BTC] Error writing BTC block CSV:', err.message);
    }
}

module.exports = storeBtcBlockHist;