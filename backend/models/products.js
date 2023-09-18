    
const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },


    description:{
        type:String,
        required:true
    },
    bigDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        required:true
    },

    images:[{
        type:String
    }],
    brand:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, //from Category Model
        ref:'Category',
        required:true
    },
    
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },

    noOfReviews:{
        type:Number,
         default:0
    },
     
    isFeatured:{
       type:Boolean
    },
    stockCount:{
        type:Number,
        required:true
    },

})


exports.Product=mongoose.model('Product',productSchema);
