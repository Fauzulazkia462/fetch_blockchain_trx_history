// index.js
const getEth = require('./Methods/getBlockchainTrxHistoryEth');
const getBtc = require('./Methods/getBlockchainTrxHistoryBtc');
const getSol = require('./Methods/getBlockchainTrxHistorySol');

const ETH_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
const BTC_ADDRESS = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
const SOL_ADDRESS = 'ATE1MynavZQhtoWfknT4P8ypRbNZHoReWS5Y9buqWxVE';

const args = process.argv[2];

switch (args) {
    case 'eth':
        getEth(ETH_ADDRESS);
        break;
    case 'btc':
        getBtc(BTC_ADDRESS);
        break;
    case 'sol':
        getSol(SOL_ADDRESS);
        break;
    default:
        console.log('Usage: npm run fetch:eth|btc|sol');
}
