async function insertEthTrx(pool, receipt) {
  const query = `
    INSERT INTO "TB_BLOCKCHAIN_TRXS_ETH" (
      "LOGS", "TXDATA", "BLOCK_DATA"
    ) VALUES ($1, $2, $3)
  `;

  const values = [
    JSON.stringify(receipt.logs || []),
    JSON.stringify(receipt.txData || {}),
    JSON.stringify(receipt.blockData || {})
  ];

  await pool.query(query, values);
}

module.exports = insertEthTrx;