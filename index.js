// ETH
const getEthCurrentGasFee = require('./Methods/ETH/getCurrentGasFee');
const getEthBlockHist = require('./Methods/ETH/getEthBlockHist');
const storeEthBlockHist = require('./Utils/ETH/storeBlockHistory');
const getEthWalletTrxHistory = require('./Methods/ETH/getWalletTrxHist');
const storeEthWalletHist = require('./Utils/ETH/storeWalletTrxHistory');
const getEthContractAbi = require('./Methods/ETH/getContractAbi');
const storeEthContractAbi = require('./Utils/ETH/storeContractAbi');

// BTC
const getBtcCurrentFee = require('./Methods/BTC/getCurrentFee');
const getBtcBlockHist = require('./Methods/BTC/getBtcBlockHist');
const storeBtcBlockHist = require('./Utils/BTC/storeBlockTrxHistory');
const getBtcWalletTrxHistory = require('./Methods/BTC/getWalletTrxHist');
const storeBtcWalletHist = require('./Utils/BTC/storeWalletTrxHistory');

const args = process.argv[2];

(async () => {
    switch (args) {
        case 'eth': {
            // get current gas fee approximation
            const gasFeeData = await getEthCurrentGasFee();
            const gasFee = gasFeeData.baseFeePerGas + gasFeeData.maxPriorityFeePerGas;
            console.log("Gas Fee is", gasFee, "wei");

            // get and store data of certain block number
            const ethData = await getEthBlockHist(22753208);
            await storeEthBlockHist(ethData);

            // get and store data of certain wallet address
            const ethWalletAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
            const walletTrxHist = await getEthWalletTrxHistory(ethWalletAddress);
            await storeEthWalletHist(walletTrxHist);

            // get and store certain contract address ABI
            const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
            const contractAbi = await getEthContractAbi(contractAddress);
            await storeEthContractAbi(contractAbi);

            break;
        }
        case 'btc': {
            // get current BTC fee rate
            const btcFee = await getBtcCurrentFee();
            console.log("BTC Fee rate is", btcFee, "sats/vByte");

            // get and store data of certain block number
            const btcBlockData = await getBtcBlockHist(808000);
            await storeBtcBlockHist(btcBlockData);

            // get and store data of certain wallet address
            const btcWalletAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
            const btcWalletHist = await getBtcWalletTrxHistory(btcWalletAddress);
            await storeBtcWalletHist(btcWalletHist);

            break;
        }
        default:
            console.log('Usage: npm run fetch:eth|btc');
    }
    process.exit(0);
})();