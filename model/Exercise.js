const mongoose = require("mongoose");


const exerciseSchema = new mongoose.Schema(
    {
        "username": {
            "type": "String"
        },
        "description": {
            "type": "String"
        },
        "duration": {
            "type": "Number"
        },
        "date": {
            "type": "Date"
        }
    }
)


exerciseSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
   }
module.exports = Exercise = mongoose.model("Exercise", exerciseSchema)