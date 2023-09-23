const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({


orderItems:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'OrderItems',
    required: true
}],

shippingAddress1:{
    type:String
},
shippingAddress2:{
    type:String
},

city:{
    type:String
},
zip:{
    type:String
},
country:{
    type:String
},
phone:{
    type:Number
},
status:{
    type:String,
    default:'Pending'
},
totalPrice:{
    type:Number
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
},

orderDate:{
    type:Date,
    default: Date.now
}

})

exports.Order=mongoose.model('Order',orderSchema);