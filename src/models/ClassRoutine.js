
const {Schema, model}= require('mongoose')
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const routineSchema = new Schema({
    
    className: String,
    routine:[
        {
            day: String,
            //number of period in a day
            period:[
                {
                    periodNumber: Number,
                    subject: String,
                    teacherName: {
                        type: String,
                        default: ""
                    },
                     timeStart: {
                        type: String,
                        default: ""
                    },
                    timeEnd:{
                        type: String,
                        default: ""
                    }
                } 
            ]
        }
    ],
    status:{
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

module.exports = model('ClassRoutine', routineSchema)
