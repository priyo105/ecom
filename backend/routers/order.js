const express= require("express")
const router=express.Router();
const {Order}=require("../models/Order.js");
const { OrderItems } = require("../models/OrderItems.js");
const { Product } = require("../models/products.js");
const { populate } = require("dotenv");

//create 
router.post("/v1/create",async(req,res)=>{
    
    // we will insert in 2 tables , one is orderItems, and another is Order.
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
    
    
    let totalprice= await calculateTotalPrice(orderIdsCombine);
    console.log(totalprice)

    //saving order tables
    let order = new Order({...req.body,
        totalPrice:totalprice,
        orderItems: orderIdsCombine, //the concept here is important ......!!!! we are sending request orderItems  [new ObjectId("650f219ace38dfede620ce0b"), new ObjectId("650f219ace38dfede620ce09") ] to orderitems
 
    })
    order = await order.save();
    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})


const calculateTotalPrice=async(orderitems)=>{
  let totalPrice=0;
  let total=await Promise.all(
    orderitems.map(async orderitem=>{
             let item=await OrderItems.findById(orderitem).populate('product');
             totalPrice= item.quantity * item.product.price;  //0+1*1000=1000
             return totalPrice   
  }))

  console.log("zzz"+total); // output would be like this [1000,2000,3000.....]
  
  let sumOfAllPrices=total.reduce((x,y)=>{
    return x+y
  },0);

  return sumOfAllPrices;
}


//get all orders 
router.get('/',async(req,res)=>{
    let orders=await Order.find({})
                          .populate('user')
                          .populate({path:'orderItems', populate:'product'}) // this will populate the product in order items 
    if(!orders){
       return  res.status(400).json({message:"There are no orders"});
    }
    res.status(200).json(orders)
})


//get Order By Id

router.get('/:id',async(req,res)=>{
    let orders=await Order.findById(req.params.id)
                          .populate('user') 
                          .populate({path:'orderItems', populate:'product'}) // this will populate the product in order items. 
                          
    if(!orders){
       return  res.status(400).json({message:"There are no orders"});
    }
    res.status(200).json(orders)
})


//get Order By UserId

router.get('/user/:id',async(req,res)=>{
    let orders=await Order.find({user:req.params.id}).populate('user'); 
    if(!orders){
       return  res.status(400).json({message:"There are no orders"});
    }
    res.status(200).json(orders) 
})
module.exports=router


//update Order Status

router.put('/:id',async (req,res)=>{
     const updatedOrder=await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
        },
        {new:true}
     )

     if(!updatedOrder){
        return res.status(400).json({message:"order not found"})
     }
     res.status(200).json({message:"order updated !",order:updatedOrder})
})


//delete Order

router.delete('/:id',(req,res)=>{
  Order.findByIdAndRemove(req.params.id).then(order=>{
     if(order){

        const orderItems=order.orderItems.map(orderitem=>{
         OrderItems.findByIdAndRemove(orderitem).then(orderitem=>{
                console.log(orderitem+" deleted")
            })
        })

        res.status(200).json({message:"Order Deleted"})
     }else{
        res.status(400).json({message:"Order Not Found !"})
     }
  })

})



//TRUNCATE A TABLE
router.delete('/',async (req, res) => {
    let orderItems=await Order.deleteMany({});
  res.send(orderItems)
});


//Get Total Sales :::::::

router.get('/get/totalSales',async(req,res)=>{
  
    let totalSales=await Order.aggregate(
        [
            { $group:{ _id:null, totalSales:{$sum:'$totalPrice'}}}
        ]
    )
    
    if(!totalSales){
        return res.status(500).json({message:"something is wrong"})
    }
    
    res.status(200).send(totalSales[0])

})    


//get Order Count

router.get('/get/count',async(req,res)=>{
  let orderCount= await Order.countDocuments();
  res.status(200).send({count:orderCount})
})





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