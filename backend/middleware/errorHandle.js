
const errorhandler=((err,req,res,next)=>{
    if(err){
        res.status(500).json({message:err})
    }
})

module.exports=errorhandler;