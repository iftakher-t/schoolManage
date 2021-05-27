const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: {
        type: String,
        unique:true
    },
    studentsNumber : {
        type: Number,
        default: 0,
        boy:{
            type: Number,
            default: 0
        },
        girl:{
            type: Number,
            default: 0
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

//export part
module.exports = mongoose.model("Classes", classSchema)