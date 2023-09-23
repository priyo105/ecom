const express= require("express")
const app= express();
require('dotenv/config');
const morgan= require('morgan');
const mongoose=require('mongoose')
const ProductRouter=require('./routers/product.js')
const CategoryRouter=require('./routers/category.js')
const UserRouter=require('./routers/user.js')
const cors=require('cors')
const auth=require('./utils/jwtauth.js')
const errorHandler=require('./utils/errorHandle.js')
var { expressjwt: jwt } = require("express-jwt");

//Middlewares
//make express understand json
app.use(express.json())
app.use(morgan('tiny'))
app.use(auth);
app.use('/',ProductRouter)
app.use('/category',CategoryRouter)
app.use('/users',UserRouter)
app.use(cors())
app.use(errorHandler)

app.options('*',cors());

//listening to post
app.listen(4000,()=>{
    console.log("Listening to PORT 4000");
})



//connecting to DB
const uri = process.env.CONNECTION_STRING;
mongoose.connect(uri).then(()=>console.log("connected to DB"))
                     .catch(e=>console.log(e));



