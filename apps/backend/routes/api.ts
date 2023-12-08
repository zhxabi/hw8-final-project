import express from 'express';
import {} from '../types/customTypes'
const Expense = require('../models/expense');
const isAuthenticated = require('../middlewares/isAuthenticated');
const apiRouter = express.Router();

apiRouter.post('/add', isAuthenticated, async function(req, res){
  try{
    const {expenseAmount, comment, categories} = req.body;
    const owner = req.user!.username;
    const exp = new Expense({expenseAmount, sharedAmount: expenseAmount, owner, comment, categories});
    await exp.save();
    res.send("Expense successfully saved!");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creading expense!");
  }
})


apiRouter.put('/:id', isAuthenticated, async function(req, res){
  try{
    const {expenseAmount, comment, categories} = req.body;
    // const owner = req.user!.username;
    // const expenses = await Expense.find({_id: _id});
    const exp = {expenseAmount, comment, categories};
    await Expense.findByIdAndUpdate(req.params.id, exp, {new:true, upsert:true});
    res.send("Expense successfully saved!");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating expense!");
  }
})

apiRouter.patch('/share/:id', isAuthenticated, async function(req, res){
  try{
    const {expenseAmount, sharedUsers} = req.body;
    const owner = req.user!.username;
    const sharedAmount = expenseAmount / (sharedUsers.length + 1.0);
    // TODO verify username correct
    // add to User.sharedUsers
    const exp = {sharedUsers, sharedAmount};
    await Expense.findByIdAndUpdate(req.params.id, exp);
    res.send("Expense successfully shared!");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error sharing expense!");
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
    // const exps = await Expense.find({owner: req.user!.username,});
    const exps = await Expense.find({$or:[ {owner:req.user!.username}, 
      {$expr: {$in: [req.user!.username, "$sharedUsers"]}} ]});
    res.send(exps.reverse())
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting expenses!");
  }
})

apiRouter.get('/categories', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.aggregate([
      { $group: {
        _id: "$categories",  
      }},
      {
        $project: {
          _id: 0,
          category: { $first: "$_id" }
        },
      }      
    ]);
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting categories!");
  }
})

apiRouter.get('/stats/categories', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.aggregate([
      {
        $match: {$or: [ {owner:req.user!.username}, 
          {$expr: {$in: [req.user!.username, "$sharedUsers"]}} ]
        }
      },
      { $unwind: "$categories" },
      { $group: {
        _id: "$categories",  
        total: { $sum: "$sharedAmount" }
      }},
      {
        $project: {
          _id: 0,
          category:"$_id",
          total: 1
        },
      }      
    ]);
    console.log(exps);
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting categories!");
  }
})


apiRouter.get('/stats/monthly', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.aggregate([
      {
        $match: {$or: [ {owner:req.user!.username}, 
          {$expr: {$in: [req.user!.username, "$sharedUsers"]}} ]
        }
      },
      { $group: {
          _id: {
            $dateToString: {
              format: "%m-%d",
              date: "$createdAt",
              timezone: "America/New_York"
            }
          },
          dayTotal: { $sum: "$sharedAmount" }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          dayTotal: 1,
        },
      },
      { $sort: {
        "date": 1
        },
      }
      
    ]);
    // console.error(exps);
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting montly!");
  }
})

apiRouter.get('/stats/shared', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.aggregate([
      {
        $match: {$or: [ {owner:req.user!.username}, 
          {$expr: {$in: [req.user!.username, "$sharedUsers"]}} ]
        }
      },
      { $group: {
        _id: "$sharedUsers",  
        count: {
          $sum: 1
        }
      }},
      {
        $project: {
          _id: 0,
          users: { $first: "$_id" }
          ,
          count: 1,
        },
      }      
    ]);
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting montly!");
  }
})

apiRouter.get('/yearly', isAuthenticated, async function(req, res){
  try{
    const exps = await Expense.aggregate([
      {
        $match: {$or: [ {owner:req.user!.username}, 
          {$expr: {$in: [req.user!.username, "$sharedUsers"]}} ]
        }
      },
      { $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
              timezone: "America/New_York"
            }
          },
          monthTotal: { $sum: "$expenseAmount" }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          monthTotal: 1,
        },
      },
      { $sort: {
        "date": 1
        },
      }
      
    ]);
    // console.error(exps);
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting yearly!");
  }
})

apiRouter.get('/:name', isAuthenticated, async function(req, res){
  try{
    // const exps = await Expense.find({owner: req.params.name,});
    const exps = await Expense.find({$or:[ {owner:req.params.name}, 
                        {$expr: {$in: [req.params.name, "$sharedUsers"]}} ]});
    res.send(exps)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting expenses!");
  }
})

module.exports = apiRouter
