const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require("body-parser")
require('./dbConnect')()
require('dotenv').config()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use("/api", require("./controllers"))


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
