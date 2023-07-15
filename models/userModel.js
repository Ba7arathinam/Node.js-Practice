const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:[true,"please Enter your name"]
    },
    email:{
        type:String,
        require:[true,"please Enter your email"],
        unique:[true,"Email id is already taken"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
    }
},{
    timestamps:true,
})

module.exports =mongoose.model("User",userSchema);