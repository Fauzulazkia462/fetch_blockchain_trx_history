async function insertEthTrx(pool, receipt) {
  const query = `
    INSERT INTO "TB_BLOCKCHAIN_TRXS_ETH" (
      "RECEIPT", "TXDATA", "BLOCK_DATA"
    ) VALUES ($1, $2, $3)
  `;

  const values = [
    JSON.stringify(receipt.receipt || []),
    JSON.stringify(receipt.txData || {}),
    JSON.stringify(receipt.blockData || {})
  ];

  await pool.query(query, values);
}

module.exports = insertEthTrx;