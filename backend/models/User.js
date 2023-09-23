    
const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },

   
    apartment:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },

    zip:{
        type:String,
        default:''
    },
 
    country:{
        type:String,
        default:''
    },
    phone:{
        type:Number
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
 

})


exports.User=mongoose.model('User',userSchema);
