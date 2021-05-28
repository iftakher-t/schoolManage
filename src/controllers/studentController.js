const Student = require('../models/Student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { userValidator ,options } = require('../../validator/userValidator')

const studentProfileViewController = async (req,res)=>{
    try{
        const id = req.params.id

        const data = await Student.findOne( {_id:id} )
        
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

const updateStudentInfoController = async (req,res)=>{
    try{
        await Student.findByIdAndUpdate(
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

const studentDeleteController = async (req,res)=>{
    try{
        const data = await Student.findOneAndUpdate(
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

const viewResultController = async (req,res)=>{
    try{
        const id = req.params.id

        const data = await Student.findOne( {_id:id} )
        
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


module.exports = { 
    studentProfileViewController,
    updateStudentInfoController,
    studentDeleteController,
    viewResultController
    // answerSubmitController
            }