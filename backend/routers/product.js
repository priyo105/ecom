const express= require("express")
const router=express.Router();
const {Product}=require("../models/products.js");
const { Category } = require("../models/category.js");
const multer= require('multer')

 //FILE UPLOAD HANDLING 
//multer disk storage -which gives full control on storing files to disk

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });


//create 
router.post("/product/v1/create",upload.single('image'),async(req,res)=>{
    console.log(req.body)
    const category=await Category.findById(req.body.category);
    if(!category){
       return res.status(400).send("Category Doesnot Exist !")
    }
    const picture=req.file.originalname;

    const newProduct=new Product({
        name:"Men tshirt 200",
        image:picture,
        stockCount:10,
        description:"This is the latest phone by Apple.",
        bigDescription:"",
        images:["https://images.unsplash.com/photo-1688649593308-40dfbb552d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80","https://images.unsplash.com/photo-1592910147752-5e0bc5f04715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
        brand:"Apple",
        price:"1000",
        category:"650db36d93c3a49fe5c12f0a",
        rating:5,
        noOfReviews:140,
        isFeatured:true
    }
    )
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

router.put("/products/:id",upload.single('image'),async (req,res)=>{

    //if we want to update the category, we need to validate if it exists or not
    if(req.body.category){
        const category=await Category.findById(req.body.category).catch(e=>res.send(e));
        if(!category){
           return res.status(400).send("Category Doesnot Exist !")
        }
    }
    
    let updatedProduct;
    //if image needs to be updated
    if(req.file){
     updatedProduct=await Product.findByIdAndUpdate(req.params.id,{...req.body,image:req.file.originalname},{new:true});
    }else{
        //else image donot need to be uploaded
        const updatedProductData = { ...req.body };
        delete updatedProductData.image;

     updatedProduct=await Product.findByIdAndUpdate(req.params.id,{...updatedProductData},{new:true});
 
    }
    res.status(200).send(updatedProduct);
})


//delete a product 


router.delete("/products/:id",async (req,res)=>{

  const deletedProduct=await Product.findByIdAndDelete(req.params.id);
  if(!deletedProduct){return res.send({"message":"The product doesnot exist"})}
  res.send(deletedProduct)

})

//for stats and dashboard
router.get('/products/get/count',async (req,res)=>{
    const productCount=await Product.countDocuments();
    if(!productCount){res.status(500).json({success:"false"})}
    res.send({count:productCount})

})


//get featured Products
router.get('/products/get/featuredproducts/?:count',async(req,res)=>{
    const count=req.params.count ? req.params.count  :0
    const featuredproducts=await Product.find({isFeatured:true}).limit(count)
    res.send(featuredproducts)
})



//get product by category Id

router.get('/products/get/productByCategoryId/:categoryId',async (req,res)=>{
    const products=await Product.find({category:req.params.categoryId})
    if(!products){return res.send({"message":"No Products Found"})}
    res.send(products)
})


//get products by category Ids 

router.get('/products/get/productsByCategoryIds', async(req,res)=>{
    
    // example :: localhost:4000/products/get/productsByCategoryIds?categories=2312312,12312312
      let filter=[]
    if(req.query.categories){
       filter=req.query.categories.split(',')
    }
    const productList=await Product.find({category:filter})
    res.status(200).send(productList)
})


//Upload multiple images-- Then update the images field in Product !!!!

router.put('/upload/:pid',  upload.array('images', 10), async(req, res) => {
    
    const files = req.files;
    console.log(req.params.pid)

    let fileName=[]
    files.map(file=>{
        fileName.push(file.originalname)
    })

    console.log(fileName)

    let product= await Product.findByIdAndUpdate(req.params.pid,{
    images:fileName    
    },{
        new:true
    }
    
    
    )

    upload.array('images', 5)(req, res, (err) => {
        res.send(product)
    });
  });

module.exports=router;