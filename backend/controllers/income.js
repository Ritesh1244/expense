const IncomeSchema = require("../modles/IncomeModel");
const { param } = require("../routes/transaction");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const cur_date = new Date();
  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date: cur_date
  });

  try {
    // Validation   
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(income.amount) || income.amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    console.error("Error saving income:", error); // Log the specific error
    res.status(500).json({ message: "Server Error" });
  }
  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const income = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  IncomeSchema.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
};
