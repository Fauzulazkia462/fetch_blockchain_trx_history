async function insertBtcTrx(pool, receipt) {
    const query = `
      INSERT INTO "TB_BLOCKCHAIN_TRXS_BTC" (
        "TXDATA", "BLOCK_DATA"
      ) VALUES ($1, $2)
    `;

    const values = [
        JSON.stringify(receipt.txData || {}),
        JSON.stringify(receipt.blockData || {})
    ];

    await pool.query(query, values);
}

module.exports = insertBtcTrx;