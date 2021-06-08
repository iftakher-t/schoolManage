const {Schema, model}= require('mongoose')
const bcrypt = require('bcrypt')

const teacherSchema = new Schema({
    firstName:String,
    lastName:String,
    userName:String,
    userType:{ type:String, default:"teacher"},
    email:{ type:String, unique:true },

    address:{ division : String, destrict : String, upozila : String, zipcode : String,  area : String },

    password: String,
    gender: String,

    profileImage: {type:String, default:""},
    resetLink : { String , default :'' },    

    educationQualification:{  
        degree:[
                    {
                        degreeName: String,
                        result: String,
                        season: String,
                        passingYears: String,
                        institution: String
                    }
                ]
                },

    officalInfo:{
        joinDate: { type: Date, default: Date.now },//yyyy-mm-dd
        salary: {
            type:String
        },
        department:{
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted:{
            type: Boolean,
            default: false
        }
    },

    modification:{
        createdAt:{
            type: Date,
            default: Date.now
        },
        updatedAt:{
            type:Date,
            default: Date.now
        }
    }
    
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
