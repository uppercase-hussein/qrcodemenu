const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require('body-parser')
const path = require("path")
const fs = require('fs');
const mongoose = require('mongoose');


const app = express()
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
  }

//connect to DB
mongoose.connect(process.env.dbConnectCloud, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
  })
  .then(()=>console.log('Connected to database Successfully'))
  .catch(err=>console.log(err))

//configure body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//set routes
app.use('/product', require('./routes/products'));
app.get("/", (req, res)=>res.json({msg:"Hello"}))
app.get("/hello", (req, res)=>res.json({msg:"Hello World"}))



//handle every other request
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'build/index.html'), (err)=> {
      if (err) {
        res.sendFile(path.join(__dirname, 'build/index.html'))
      }
    })
  })


app.listen(process.env.PORT || 5000, ()=>{ console.log(`Server started on port ${process.env.PORT || 5000}`)})