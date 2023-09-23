const express= require("express")
const router=express.Router();
const {Order}=require("../models/Order.js");
const { OrderItems } = require("../models/OrderItems.js");
const { Product } = require("../models/products.js");

//create 
router.post("/v1/create",async(req,res)=>{


    let orderItems=req.body.orderItems;
 

    let orderIds= Promise.all(
        orderItems.map(async orderitem=>{  // Looping through all orderItems and the saving each order item in OrderItems Table...       
        //checking if the product Ids are actually exists 
        let product=await Product.findById(orderitem.product);
        if(!product){
            return res.send('invalid product ids')
        }

        const orderItem=new OrderItems({
            quantity:orderitem.quantity,
            product:orderitem.product  
        })

         await orderItem.save();
         return orderItem._id; // this will return a promise
    })
    )  
    const orderIdsCombine=await orderIds;
    console.log(orderIdsCombine)

    let order = new Order({
        orderItems: orderIdsCombine, //the concept here is important ......!!!! we are sending request orderItems  [new ObjectId("650f219ace38dfede620ce0b"), new ObjectId("650f219ace38dfede620ce09") ] to orderitems
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: 0,
        user: req.body.user,
    })
    order = await order.save();
    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})

module.exports=router





//Example Front end request example

// {
//     "orderItems" : [
//         {
//             "quantity": 3,
//             "product" : "65082863206b322a32be4ee3"
//         },
//         {
//             "quantity": 2,
//             "product" : "65082863206b322a32be4ee3"
//         }
//     ],
//     "shippingAddress1" : "Flowers Street , 45",
//     "shippingAddress2" : "1-B",
//     "city": "Prague",
//     "zip": "00000",
//     "country": "Czech Republic",
//     "phone": "+420702241333",
//     "user": "5fd51bc7e39ba856244a3b44"
// }