const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = () => {
    const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@data.fee59.mongodb.net/freecodecampdb?retryWrites=true&w=majority`
    mongoose.connect(uri)
    .then(res => console.log("connected to db"))
    .catch(err => console.log(err))
}
module.exports = dbConnect