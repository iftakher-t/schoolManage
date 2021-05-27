const {Schema, model}= require('mongoose')
const bcrypt = require('bcrypt')

const mcqSchema = new Schema({
    firstName:String,
    
    firstName:String,

    userName:String,

    userType:{ type:String, default:"teacher"},
    
    isActive:{ type: String, status:["Active","Inactive"], default:"Inactive" },
    isDeleted:Boolean,

    joinDate: { type: Date, default: Date.now },//yyyy-mm-dd

    address:{ division : String, destrict : String, upozila : String, zipcode : String,  area : String },

    email:{ type:String, unique:true },

    password: String,

    profileImage: String,

    resetLink : { String , default :'' }
    
})

module.exports = model('Mcq',mcqSchema)
