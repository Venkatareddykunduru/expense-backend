const Expense = require('../models/expense.js');

exports.addExpense = (req, res, next) => {
    const amount = req.body.amount;
    const category = req.body.category;
    const description = req.body.description;
    Expense.create({
        amount: amount,
        category: category,
        description: description
    })
    .then(() => {
        console.log('Expense saved');
        res.status(200).json({ message: 'Expense added successfully' });
    })
    .catch((err) => {
        console.log('Error adding expense: ' + err);
        res.status(500).json({ error: 'Failed to add expense' });
    });
}

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log("Error getting expenses: " + err);
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    });
}

exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
    Expense.findByPk(id)
    .then((expense) => {
        return expense.destroy();
    })
    .then(() => {
        console.log('Expense deleted');
        res.status(200).json({ message: 'Expense deleted successfully' });
    })
    .catch((err) => {
        console.log('Error deleting expense: ' + err);
        res.status(500).json({ error: 'Failed to delete expense' });
    });
}

exports.editExpense = (req, res, next) => {
    const id = req.params.id;
    const updatedAmount = req.body.amount;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.description;

    Expense.findByPk(id)
    .then((expense) => {
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        expense.amount = updatedAmount;
        expense.category = updatedCategory;
        expense.description = updatedDescription;
        return expense.save();
    })
    .then(() => {
        console.log('Expense updated');
        res.status(200).json({ message: 'Expense updated successfully' });
    })
    .catch((err) => {
        console.log('Error updating expense: ' + err);
        res.status(500).json({ error: 'Failed to update expense' });
    });
}
