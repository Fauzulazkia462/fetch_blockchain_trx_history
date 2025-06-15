async function insertEthTrx(pool, receipt) {
    const query = `
      INSERT INTO "TB_BLOCKCHAIN_TRXS_ETH" (
      "LOGS", "TXDATA"
      ) VALUES ($1,$2)
    `;

    const values = [
        JSON.stringify(receipt.logs),
        JSON.stringify(receipt.txData || {})
    ];

    await pool.query(query, values);
}

module.exports = insertEthTrx;