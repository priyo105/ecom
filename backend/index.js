const express= require("express")
const app= express();
require('dotenv/config');
const morgan= require('morgan');
const mongoose=require('mongoose')
const ProductRouter=require('./routers/product.js')
const CategoryRouter=require('./routers/category.js')

const cors=require('cors')


//Middlewares
//make express understand json
app.use(express.json())
app.use(morgan('tiny'))
app.use('/',ProductRouter)
app.use('/category',CategoryRouter)
app.use(cors())
app.options('*',cors());

//listening to post
app.listen(4000,()=>{
    console.log("Listening to PORT 4000");
})



//connecting to DB
const uri = process.env.CONNECTION_STRING;
mongoose.connect(uri).then(()=>console.log("connected to DB"))
                     .catch(e=>console.log(e));



