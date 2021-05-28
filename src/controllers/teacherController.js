const Teacher = require('../models/Teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { userValidator ,options } = require('../../validator/userValidator')


const createTeacherController = async (req,res)=>{
    try{
        const {error, value }= userValidator.validate(req.body)
        if(error){
            res.status(500).json({
                result: value,
                message: 'validation error',
                Error: error.details[0].message
            })
        }else{
        const {userName, userType, isActive, email, password , profileImage } = req.body

        const teacher = new Teacher({ userName, userType, isActive, email, password , profileImage })

        const result = await teacher.save()
            res.status(200).json({
                result: result,
                message: 'teacher saved successfully'
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error ct",
            err
        })
    }
}

const teacherLoginController = async (req,res)=>{
    try{
        const {email, password } = req.body
        const secretKey = process.env.SECRET_KEY
        const user = await Teacher.findOne( { email })
        if(user){
            const isValid = await bcrypt.compare( password , user.password)
        let data = {
            userName: user.userName,
            userType : user.userType
        }
        const token = jwt.sign( data , secretKey , {expiresIn : '1h'} )
        if(isValid){
            res.status(200).json({
                message: 'Login successfully',
                token
            })
        }else{
            res.json({ message: 'Password does not match'
            })
        }
    }else{
        res.json({ message: 'user not found'
        })
    }

        }
    catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error  t log",
            err
        })
    }
}

const updateTeacherInfoController = async (req,res)=>{
    try{
        await Teacher.findByIdAndUpdate(
            {_id : req.params.id},
            {$set: req.body},
            {multi : true}
            )
        
        res.status(200).json({
            message: 'teachers data updated successfully ',
            updatedResult: req.body // show new data (req.body)
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const TeacherdeleteController = async (req,res)=>{
    try{
        const data = await Teacher.findOneAndUpdate(
            {_id:req.params.id},
            { $set:{
                isActive : false
                }
            }
            )
        res.status(200).json({
            result: data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const changeactivityController = async (req,res)=>{
    try{
        const id = req.params.id

        const data = await Teacher.findOneAndUpdate(
            {_id:id},

            {
                $set: {
                    isActive: true
                    }
            }
            )
        
        return res.json({
            message: 'Activity updated success',
            result : data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const allTeacherGetController = async (req,res)=>{
    try{
        const teacher = await Teacher.find()
        if(teacher.length){
            res.status(200).json({
                result: teacher 
            })
        }else{
            res.status(200).json({
                message: 'No teacher yet'
            })
        }
    }catch(err){
        res.status(500).json({
            message : "server error allteacher",
            err
        })
    }
}

const profileImageChangeController = async (req ,res)=>{
    try{
        const update = await Teacher.findByIdAndUpdate(
            {_id:req.params.id},
            { $set:{
                profileImage:req.file.filename
                }
            });
         res.status(200).json({
                message: 'profileImage updated success',
                result : update
            })

    }catch(err){
        res.status(500).json({
            message : "server error up p i",
            err
        })
    }
}


module.exports = { 
    createTeacherController,
    updateTeacherInfoController,
    TeacherdeleteController,
    changeactivityController,
    allTeacherGetController,
    //--------------------

    profileImageChangeController,
    teacherLoginController,
    // createAQuestionController,
    //resultGetController

            }