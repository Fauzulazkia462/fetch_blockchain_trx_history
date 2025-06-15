const connectToDb = require('../../DB/db_conn');
const insertSolTrx = require('../../DB/Queries/SOL/insertTrx');

async function storeTrxHistory(allReceipts) {
    const pool = await connectToDb();

    for (const receipt of allReceipts) {
        try {
            await insertSolTrx(pool, receipt);
            console.log(`[DB] Stored Sol tx: ${receipt.transactionHash}`);
        } catch (err) {
            console.error(`[DB] Error storing tx ${receipt.transactionHash}: ${err.message}`);
        }
    }

    await pool.end();
}

module.exports = storeTrxHistory;