// const { required } = require("joi")


const Student = require('../models/Students')



const admitSingleStudentController = async (req ,res)=>{
    try{
        const splitedDateOfBirth = personalInfo.dateOfBirth.split("-")
        const birthYear =  splitedDateOfBirth[0]
        const birthDate = splitedDateOfBirth[splitedDateOfBirth.length - 1]

        //format of user id is (BirthDate - userID - BirthYear)
        const generateUserId = `${birthDate}${userId}${birthYear}` //get the new user id
        
        //creat the student

        const student = new Student( {
            ...req.body,
            userId: generateUserId,
            profileImage : req.file.fileName
            }
            )

        let data = await student.save();
            res.status(201).json({
                message: 'student added successfully',
            })
    
    }catch(err){
        res.status(500).json({ err })
    }
}

const updateStudentInfoController = async (req ,res)=>{
    try{ 
        const data = await Student.findByIdAndUpdate(
            { _id:req.params.id },
            {$set: req.body},
            {multi : true}
            )

            res.status(200).json({
                message: 'students data updated successfully',
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error su",
            err
        })
    }
}

const studentDeleteController = async (req ,res)=>{  //delete temporary
    try{
        const data = await Student.findByIdAndUpdate(
            {_id:req.params.id},
            { $set:{
                isDeleted : true
                }
            }
            )
            res.status(200).json({
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error sd",
            err
        })
    }
}

const changeActivityController = async (req ,res)=>{
    try{
        const data = await Student.findByIdAndUpdate(
            {_id:req.params.id},
            { $set:{
                isActive : "Active"
                }
            }, {new:true, useFindAndModify: false });

            res.status(200).json({
                message: 'Activity updated success',
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error ca",
            err
        })
    }
}

const studentProfileViewController = async (req ,res)=>{
    try{
        const student = await Student.findById(
            {_id:req.params.id})

            res.status(200).json({
                result : student
            })

    }catch(err){
        res.status(500).json({
            message : "server error pv",
            err
        })
    }
}

const profileImageChangeController = async (req ,res)=>{
    try{
        const data = await Student.findByIdAndUpdate(
            {_id:req.params.id},
            { $set:{
                profileImage : req.file.fileName
                }
            },
            {new: true, useFindAndModify: false}
            );
            res.status(200).json({
                message: 'Profile Image updated success',
                result : data
            })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error pi",
            err
        })
    }
}

// -------------------

const allStudentGetController = async (req,res)=>{
    try{
        const student = await Student.find()
        if(student.length){
            res.status(200).json({
                result: student 
            })
        }else{
            res.status(200).json({
                message: 'No student yet'
            })
        }
    }catch(err){
        console.log(err),
        res.status(500).json({
            message : "server error from all student",
            err
        })
    }
}

const classwiseStudentGetController = async (req,res)=>{
    try{
    //    let { Class } = req.query
        const student = await Student.find( req.query )
        if(student.length){
            res.status(200).json({
                result: student
            })
        }else{
            res.status(200).json({
                message: 'No student yet'
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error cw",
            err
        })
    }
}

const viewResultController = async (req,res)=>{
    try{
        const student = await Student.findById({_id: req.params.id})
        console.log(student.result)
        if(student.result){
            res.status(200).json({
                result: student.result 
            })
        }else{
            res.status(200).json({
                message: 'No Result yet'
            })
        }
    }catch(err){
        console.log(err),
        res.status(500).json({
            message : "server error from result",
            err
        })
    }
}

// const deleteController = async (_id)=>{
//     try{
//         const result = await Student.findByIdAndDelete({_id: req.params.id})
//         console.log(result)
//                 // message: 'No Result yet'

//         }
//     catch(err){
//         console.log(err),
//         res.status(500).json({
//             message : "server error from result",
//             err
//         })
//     }
// }


module.exports = {
    admitSingleStudentController,
    updateStudentInfoController,
    studentDeleteController,
    changeActivityController,
    studentProfileViewController,

    // ---------------------
    profileImageChangeController,
    allStudentGetController,

    classwiseStudentGetController,
    viewResultController
    // questionSubmitController
}

// const paginationController = async (req, res, next)=>{
//     try{
//         let { page , size} =req.query

//         if(!page){
//             page= 1
//         }
//         if(!size){
//             size= 5
//         }
//         const limit = parseInt(size)
//         const skip = (page - 1) * size

//         // let { page } =req.params
//         // const limit = 5
//         // const skip =(page -1) * limit

//         const users = await User.find().limit(limit).skip(skip)
//         res.send(users)
//     }catch(err){
//         res.status(500).json({
//             message : "server error from filter",
//             err
//         })
//     }
// }