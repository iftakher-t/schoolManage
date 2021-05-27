const {Schema, model}= require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    userType:String,

    isDeleted:{ type: Boolean, default:false },

   createdDate: { type: Date, default: Date.now },//yyyy-mm-dd
    
})

module.exports = model('User',userSchema)
