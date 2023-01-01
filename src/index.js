const express = require ("express")
const route = require('./routes/route')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express();

app.use(express.json())
app.use(multer().any())

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://YuktaSadana:yuiopjkl@cluster0.ikfqj5s.mongodb.net/arogyaSetu_Cowin",
        {useNewUrlParser:true})
        .then(() => console.log("Database is conneted"))
        .catch((error) => console.log(error) )

app.use("/",route)

app.listen(3000,function(){
    console.log("application running on port : "+3000);
})

/*



*/