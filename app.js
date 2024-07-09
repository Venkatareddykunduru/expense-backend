const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/database.js');
const app = express();
const expenseRoutes=require('./routes/expense.js');


app.use(cors());
app.use(bodyParser.json()); // For parsing application/json


app.use(expenseRoutes);


sequelize.sync()
.then((result)=>{
    //console.log(result);
})
.catch(err=>{
    console.log(err);
});

app.listen(3000);


