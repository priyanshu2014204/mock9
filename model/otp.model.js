const mongoose=require('mongoose')

const otpschema=mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    expireat:{
        type:Number,
        default:Date.now()+3000000
    },
    onejwt:{
        type:String
    }
})

const Otp=mongoose.model('otp',otpschema);

module.exports={Otp}