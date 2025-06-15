const getBtc = require('./Methods/getBlockchainTrxHistoryBtc');
const getSol = require('./Methods/getBlockchainTrxHistorySol');

// ETH
const getAllEthTrx = require('./Methods/ETH/getAllTrxHistory');
const storeEthTrx = require('./Methods/ETH/storeTrxHistory');

const BTC_ADDRESS = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
const SOL_ADDRESS = 'ATE1MynavZQhtoWfknT4P8ypRbNZHoReWS5Y9buqWxVE';

const args = process.argv[2];

(async () => {
    switch (args) {
        case 'eth': {
            const allReceipts = await getAllEthTrx(0);
            await storeEthTrx(allReceipts);
            break;
        }
        case 'btc':
            await getBtc(BTC_ADDRESS);
            break;
        case 'sol':
            await getSol(SOL_ADDRESS);
            break;
        default:
            console.log('Usage: npm run fetch:eth|btc|sol');
    }
    process.exit(0);
})();