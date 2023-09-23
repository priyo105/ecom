
const express= require("express")
const router=express.Router();
const {User}=require("../models/User.js");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//create User - register
router.post('/v1/create',async (req,res)=>{
    let userdata=req.body;
    userdata.passwordHash=bcrypt.hashSync(req.body.passwordHash,10) //hashing the password
    let user=new User(userdata);

    await user.save()
              .then(()=>{
                       res.status(201).send(user);
                      })
              .catch(e=>res.send(e))
  })



//get users
router.get('/',async(req,res)=>{
    let users= await User.find().select('-passwordHash');  // -passwordHash will exclucde the passwords from frontend...
    if(!users){
      return res.status(404).send({"message":"No users availabe"})
    }
    res.send(users)
})

//getUserById
router.get('/:id',async(req,res)=>{
    let user=await User.findById(req.params.id).select('-passwordHash');
    if(!user){
     return res.status(404).send({"message":"User Doesnot exist !"})
    }
    res.send(user);
})

const generateToken=(user)=>{
    let secretkey=process.env.secret;
    let token=jwt.sign(
    {
        userId:user.id,
        isAdmin:user.isAdmin
    },
    secretkey,
    {expiresIn:'1d'} 
    )
    return token;
}

//Login

router.post('/login',async (req,res)=>{
    let user=await User.findOne({email:req.body.email,password:req.body.passwordHash});
    if(!user){
        return res.status(404).send({message:"user not found"})
    }

    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        let token=generateToken(user);
       return res.status(200).send({user:user.email,token:token,message:'User Authenticated !'})
    }else{
       return res.status(400).send({message:"Username or Password is incorrect ! Please Try Again"})
    }
})

//userCount 

router.get('/get/count',async (req,res)=>{
    const users=await User.countDocuments();
    if(!users){res.status(500).json({success:"false"})}
    res.send({count:users})

})


  module.exports=router;