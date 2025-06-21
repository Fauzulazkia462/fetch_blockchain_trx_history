// ETH
const getEthCurrentGasFee = require('./Methods/ETH/getCurrentGasFee');
const getEthBlockHist = require('./Methods/ETH/getEthBlockHist');
const storeEthBlockHist = require('./Utils/ETH/storeBlockHistory');
const getEthWalletTrxHistory = require('./Methods/ETH/getWalletTrxHist');
const storeEthWalletHist = require('./Utils/ETH/storeWalletTrxHistory');
const getEthContractAbi = require('./Methods/ETH/getContractAbi');
const storeEthContractAbi = require('./Utils/ETH/storeContractAbi');

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