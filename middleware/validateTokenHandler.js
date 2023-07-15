const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

const validateToken=asyncHandler (async(res,req,next)=>{
    let token;
    let authHeader=req.header.Authorization ||req.header.authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded)

        })

  
    }
})
module.exports=validateToken;