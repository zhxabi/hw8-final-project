import express from 'express';

const Expense = require('../models/expense');
const isAuthenticated = require('../middlewares/isAuthenticated');
const apiRouter = express.Router();

apiRouter.post('/add', isAuthenticated, async function(req, res){
  try{
    const {expenseAmount, comment} = req.body;
    const owner = req.user!.username;
    const exp = new Expense({expenseAmount, owner, comment});
    await exp.save();
    res.send("Expense successfully saved!");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creading expense!");
  }
})

apiRouter.put('/:id', isAuthenticated, async function(req, res){
  try{
    const {expenseAmount, comment} = req.body;
    // const owner = req.user!.username;
    // const expenses = await Expense.find({_id: _id});
    const exp = {expenseAmount: expenseAmount, comment: comment};
    await Expense.findByIdAndUpdate(req.params.id, exp, {new:true, upsert:true});
    res.send("Expense successfully saved!");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating expense!");
  }
})

apiRouter.delete('/:id', isAuthenticated, async function(req, res){
  try{
    // Expense.findByIdAndDelete(req.params.id);
    await Expense.findOneAndDelete({ _id: req.params.id }, );

    res.send("Expense successfully deleted!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting expense!");
  }
})

// apiRouter.get('/', async function(req, res){
//   try{
//     const exps = await Expense.find({});
//     res.send(exps)
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error getting expenses!");
//   }
// })

apiRouter.get('/', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.find({owner: req.user!.username,});
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting expenses!");
  }
})

apiRouter.get('/:name', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.find({owner: req.params.name,});
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting expenses!");
  }
})

module.exports = apiRouter
