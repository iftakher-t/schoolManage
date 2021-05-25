const {Schema, model}= require('mongoose')
const bcrypt = require('bcrypt')

const teacherSchema = new Schema({
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

teacherSchema.pre('save', function(next){
    var teacher = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(teacher.password, salt , function(err,hash){
                if(err){
                    return next(err)
                }
                if(hash){
                    teacher.password = hash
                }
                next()
            })
        })
    }else{
        next()
    }
}) 

module.exports = model('Teacher',teacherSchema)
