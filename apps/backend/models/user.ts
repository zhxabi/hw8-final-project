import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: String,
  username: { type: String },
  password: { type: String },
});

userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('User', userSchema)
