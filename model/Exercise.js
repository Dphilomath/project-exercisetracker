const mongoose = require("mongoose");



const options = {
    toJSON: {
        // versionKey: false,
        transform: function(doc, ret) {
            // ret is the object that will be returned as the result
            // (and then stringified before being sent)
            ret.date = ret.date.toDateString()
            delete ret.__v;
            delete ret._id
            return ret;
        }
    }
};
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
    }, options)



module.exports = Exercise = mongoose.model("Exercise", exerciseSchema)