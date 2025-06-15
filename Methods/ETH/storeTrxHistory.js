const connectToDb = require('../../DB/db_conn');
const insertEthTrx = require('../../DB/Queries/ETH/insertTrx');

async function storeTrxHistory(allReceipts) {
    const pool = await connectToDb();

    for (const receipt of allReceipts) {
        try {
            await insertEthTrx(pool, receipt);
            console.log(`[DB] Stored tx: ${receipt.transactionHash}`);
        } catch (err) {
            console.error(`[DB] Error storing tx ${receipt.transactionHash}: ${err.message}`);
        }
    }

    await pool.end(); // Close DB connection
}

module.exports = storeTrxHistory;