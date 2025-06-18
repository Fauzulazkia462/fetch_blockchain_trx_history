// ETH
const getAllEthTrx = require('./Methods/ETH/getAllTrxHistory');
const storeEthTrx = require('./Methods/ETH/storeTrxHistory');

// SOL
const getAllSolTrx = require('./Methods/SOL/getAllTrxHistory');
const storeSolTrx = require('./Methods/SOL/storeTrxHistory');

// BTC
const getAllBtcTrx = require('./Methods/BTC/getAllTrxHistory');
const storeBtcTrx = require('./Methods/BTC/storeTrxHistory');

const args = process.argv[2];

(async () => {
    switch (args) {
        case 'eth': {
            const allReceipts = await getAllEthTrx(0);
            await storeEthTrx(allReceipts);
            break;
        }
        case 'btc':
            const allReceipt = await getAllBtcTrx(0);
            await storeBtcTrx(allReceipt);
            break;
        case 'sol':
            const allReceipts = await getAllSolTrx(0);
            await storeSolTrx(allReceipts);
            break;
        default:
            console.log('Usage: npm run fetch:eth|btc|sol');
    }
    process.exit(0);
})();