
const express= require("express")
const router=express.Router();
const {Product}=require("../models/products.js");
const { Category } = require("../models/category.js");



router.post("/product/v1/create",async(req,res)=>{

    const category=await Category.findById(req.body.category);
    if(!category){
       return res.status(400).send("Category Doesnot Exist !")
    }


    const newProduct=new Product(req.body)
     newProduct.save()
               .then(()=>res.status(201).send(newProduct))
               .catch(e=>res.status(401).send(e));
 
})

// all products- select helps to specify which fields to show
router.get("/products",async (req,res)=>{
    const allproducts=await Product.find().select('name image')
    res.send(allproducts)
})


//get product by ID
router.get("/products/:id",async (req,res)=>{
    const product=await Product.findById(req.params.id).populate('category'); // It will populate data from external joined tables, in this case category.. ****
    if(!product) { return res.status(500).send({"message":"Product Not Found"})};
    res.send(product)
})


//update

router.put("/products/:id",async (req,res)=>{

    //if we want to update the category, we need to validate if it exists or not
    if(req.body.category){
        const category=await Category.findById(req.body.category).catch(e=>res.send(e));
        if(!category){
           return res.status(400).send("Category Doesnot Exist !")
        }
    }


    const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(updatedProduct);


})


//delete a product 


router.delete("/products/:id",async (req,res)=>{

  const deletedProduct=await Product.findByIdAndDelete(req.params.id);
  if(!deletedProduct){return res.send({"message":"The product doesnot exist"})}
  res.send(deletedProduct)

})


module.exports=router;