//@description Register User
//@router POST/api/users/register
//@access public

const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')

const registerUser=asyncHandler(
   async (req,res)=>{
    const {username,email,password}=req.body
    if(!username||!password||!email){
        res.status(400);
        throw new Error('All fields are required')
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User is already registered')
    }
//hash password
const hashPassword = await bcrypt.hash(password, 10);
console.log("hash password is :",hashPassword)

const user=await User.create({
    username,
    email,
    password:hashPassword,
});

console.log(`User created ${user}`)

if(user){
    res.status(200).json({_id: user.id,email: user.email})
}else{
    res.status(400);
    throw new Error("User data is not valid")
}
        res.json({message:'Register the user'})
    }
)
//@description login User
//@router POST/api/users/login
//@access public

const loginUser=asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body;
        if(!email||!password){
            res.status(400);
            throw new Error("All field is required")
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password) )){
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
        },process.env.ACCESS_TOKEN,{expiresIn:'1m'})
            res.status(200).json({accessToken})
        }else{
            res.status(401)
            throw new Error("email or password is not valid")
        }
        //  res.json({message:'login  user'})
     }
 )




//@description current User
//@router GET/api/users/current
//@access private

const currentUser=asyncHandler(
    async (req,res)=>{
         res.json({message:'Current  user'})
     }
 )

 module.exports = {registerUser,loginUser,currentUser}