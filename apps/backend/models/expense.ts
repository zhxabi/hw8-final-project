import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  expenseAmount: { type: Number, required: true },
  comment: { type: String },
  owner: { type: String, required: true },
}, {
  timestamps: true
});


module.exports =  mongoose.model('Question', expenseSchema)
