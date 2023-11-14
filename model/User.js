const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
   }

module.exports =  User = mongoose.model("User", userSchema)