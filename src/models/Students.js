const {Schema, model}= require('mongoose')

const studentSchema = new Schema({
    
    firstName: String,
    lastName: String,
    className: String,
    roll:String,
    section:String,
    profileImage: String,
    userType:{ type:String, default:"student" },
    admitionDate: { type: Date, default: Date.now },//yyyy-mm-dd
    isActive:{ type: String, status:["Active","Inactive"], default:"Inactive" },
    isDeleted:Boolean,
    profileImage: String,
    result: [
        { firstTerm : String }, 
        { secondTerm : String }, 
        { thirdTerm : String }
    ]
})

module.exports = model('Student', studentSchema)
