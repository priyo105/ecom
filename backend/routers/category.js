const express= require("express")
const router=express.Router();
const {Category}=require("../models/category.js")

router.post('/v1/create',async (req,res)=>{

  let category=new Category(req.body);
  await category.save()
                .then(()=>{
                     res.status(201).send(category);
                    })
                .catch(e=>res.send(e))

})

router.get(`/all`,async(req,res)=>{
    const categoryList=await Category.find();
    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList)
})


router.get('/:id',async(req,res)=>{
  
    const category=await Category.findById(req.params.id)
    if(category){
        res.status(200).send(category)
    }else{
        res.status(500).send("Category Not Found")
    }

})

//update
router.put('/update/:id',async(req,res)=>{
    const updatedCategory= await Category.findByIdAndUpdate(req.params.id,
                                                            req.body ,
                                                            {new:true}); //req.body indicates user sends json to update
    res.status(200).send(updatedCategory);
})


router.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            return res.status(200).json({ success: true, message: 'Category deleted' });
        } else {
            return res.status(404).json({ success: false, message: 'Category Not Found' });
        }
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
    }
});


module.exports=router;