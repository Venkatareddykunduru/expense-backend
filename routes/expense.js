const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense.js');

router.get('/', expenseController.getExpenses);
router.post('/addexpense', expenseController.addExpense);
router.delete('/deleteexpense/:id', expenseController.deleteExpense);
router.put('/editexpense/:id',expenseController.editExpense);

module.exports = router;
