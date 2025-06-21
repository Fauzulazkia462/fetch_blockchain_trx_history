const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

function flattenWalletTx(tx) {
    return {
        txid: tx.txid,
        status: tx.status.confirmed ? 'confirmed' : 'unconfirmed',
        block_height: tx.status.block_height || null,
        input_count: tx.vin.length,
        output_count: tx.vout.length
    };
}

async function storeBtcWalletHist(data, outputPath = './btc_wallet_data.csv') {
    try {
        const flatData = data.map(flattenWalletTx);
        const parser = new Parser({ fields: Object.keys(flatData[0]) });
        const csv = parser.parse(flatData);
        fs.writeFileSync(path.resolve(outputPath), csv, 'utf8');
        console.log(`[CSV] BTC wallet history saved to ${outputPath}`);
    } catch (err) {
        console.error('[BTC] Error writing BTC wallet CSV:', err.message);
    }
}

module.exports = storeBtcWalletHist;