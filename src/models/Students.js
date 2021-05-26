const {Schema, model}= require('mongoose')

const studentSchema = new Schema({
    userId:{
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    FathersName: String,
    MothersName: String,
    gender: String,
    email: { type: String, unique: true , trim: true },
    dateOfBirth:{ type: Date},
    contact:{
        permanentAddress: String,
        currentAddress: String,
        mobileNo:String,
    },

    profileImage:{type:String, default:""},
    userType:{
        type:String,
        trim: true,
        enum: ["student"]
    },
    userType:{ type:String, default:"student" },

    isActive:{ type: Boolean, default:true },
    isDeleted:{ type: Boolean, default:false },
    
    password:{type:String, default:""},

    // academicInfo
        admitionDate: { type: Date, default: Date.now },//yyyy-mm-dd
        className:{type:String, default:""},
        roll:{type:String, default:""},
        section:{type:String, default:""},
        examDetails: [
            {
                examType: {
                    type: String,
                    default: ""
                },
                examSubject: {
                    type: String,
                    default: ""
                },
                totalMarks: {
                    type: Number,
                    default: ""
                },
                examDate: {
                    type: Date,
                    default: Date.now
                        },
                result:{
                    totalMark:{
                       type: Number,
                       default: 0
                    },
                    marks: {
                        type: Number,
                        default: 0
                    },
                    rightAnswer: {
                        type:Number,
                        default: 0
                    },
                    wrongAnswer:{
                        type:Number,
                        default: 0
                    },
                    isPublished: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        ],
        attendanceRecord: {
            totalClass: {
                type: Number,
                default: 0
            },
            present: {
                type: Number,
                default: 0
            },
            absent: {
                type: Number,
                default: 0
            },
            record:[
                {
                    classDate: Date,
                    status: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        },

    recoveryToken:{
        type: String,
        default: ""
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

module.exports = model('Student', studentSchema)
