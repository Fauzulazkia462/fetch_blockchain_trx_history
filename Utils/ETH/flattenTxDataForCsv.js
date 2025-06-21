function flattenTxData(tx) {
    return {
        transactionHash: tx.transactionHash,
        blockNumber: tx.blockNumber,
        blockTimestamp: tx.blockTimestamp,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        gas: tx.gas,
        gasPrice: tx.gasPrice,
        nonce: tx.nonce,
        input: tx.input,
        txType: tx.txType,
        receiptStatus: tx.receiptStatus,
        contractAddress: tx.contractAddress,
        cumulativeGasUsed: tx.cumulativeGasUsed,
        effectiveGasPrice: tx.effectiveGasPrice,
        gasUsed: tx.gasUsed,
        emittedEvents: JSON.stringify(tx.emittedEvents)
    };
}

module.exports = flattenTxData;