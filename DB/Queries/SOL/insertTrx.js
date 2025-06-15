async function insertSolTrx(pool, receipt) {
  const query = `
      INSERT INTO "TB_BLOCKCHAIN_TRXS_SOL" ("BLOCK_DATA", "TXDATA")
      VALUES ($1, $2)
  `;

  const values = [
    JSON.stringify(receipt.blockData || []),
    JSON.stringify(receipt.txData || {})
  ];

  await pool.query(query, values);
}

module.exports = insertSolTrx;