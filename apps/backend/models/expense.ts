import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  expenseAmount: { type: Number, required: true },
  sharedAmount:  { type: Number },
  comment: { type: String },
  owner: { type: String, required: true },
  // sharedUsers: [{ type: Schema.Types.ObjectId, ref: 'Shared'}]
  sharedUsers: [{ type: String, ref: 'Shared'}]
}, {
  timestamps: true,
  toJSON: { virtuals: true } 
});

// expenseSchema.virtual('sharedAmount')
//   .get(function() {
//     return this.expenseAmount / (this.sharedUsers.length + 1.0);
//   });


module.exports =  mongoose.model('Question', expenseSchema)
