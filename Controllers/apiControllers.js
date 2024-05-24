const csvModel = require("../Schema/CSVSchema");

const getBalance = async (req, res) => {
  const { timestamp } = req.body;

  try {
    const balance = await getBalanceAtTimestamp(timestamp);
    res.status(200).json(balance);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

async function getBalanceAtTimestamp(timestamp) {
  const transactions = await csvModel.find({
    UTC_Time: { $lte: new Date(timestamp) },
  });

  const balance = transactions.reduce((acc, transaction) => {
    const { BaseCoin, Operation, Opertion_amount } = transaction;

    const assetBalance = acc[BaseCoin] || 0;

    if (Operation === 'Sell') {
        acc[BaseCoin] = assetBalance - Opertion_amount;
    } else {
        acc[BaseCoin] = assetBalance + Opertion_amount;
    }

    return acc;
  }, {});
  return balance;
}


module.exports={
    getBalance
}