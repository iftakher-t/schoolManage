
const ClassRoutine = require("../models/classRoutine")
const Class = require('../models/Class')
const nodemailer = require('nodemailer')
const { userValidator ,options } = require('../../validator/userValidator')

// const User = require("../../model/user/user")
// const routineValidation = require("../../../validation/classRoutine")


//creat a class routine
const createClassRoutineController = async (req, res) => {
    try{
        const {error} = routineValidation.validate(req.body) //check the routine validation
        if(error){
            res.json({
                error
            })
        }else{
            const newClassRoutine = new ClassRoutine(req.body) //create the class routine
            const isSaved = await newClassRoutine.save() 
            if(isSaved){
                res.json({
                    message: "class routine successfully created"
                })
            }
        }
    }
    catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}

//update class routine
const updateClassRoutineController = async (req, res) => {
    try{
        const {className} = req.params //get the class name from params

            const findClassRoutine = await ClassRoutine.findOne({className}) //search the class routine
            if(findClassRoutine){
                // const classRoutine = findClassRoutine //store the class routine 
                const updateClassRoutine = await ClassRoutine.updateOne(
                    {
                        className
                    }, //querry
                    {
                        $set: req.body //update whole class routine
                    }, //update
                    {} //option
                ) //did the update operation

                if(updateClassRoutine){
                    res.json({
                        message: "Class routine successfully updated"
                    })
                }else{
                    res.json({
                        message: "Class routine update failed"
                    })
                }
            }else{
                res.json({
                    message: "class routine not found"
                })
            }
    }
    catch(err){

    }
}

//delete a class routine
const deleteClassRoutineController = async (req, res) => {
    try{
        const {className} = req.params //get the class name from params

                const isClassRoutine = await ClassRoutine.findOne({className}) //get the class routine
                const {isDeleted} = isClassRoutine.status //get the is deleted status from data base
                if(isDeleted == false){
                     const isUpdated = await ClassRoutine.updateOne(
                        {
                            className
                        }, //query
                        {
                            $set:{
                                "status.isDeleted": true //this is the delete update  
                            }
                        }, //update
                        {} //option
                    )
                    if(isUpdated){
                        res.json({
                            message: "class routine deleted successfully"
                        })
                    }else{
                        res.json({
                            message: "Class routine not found "
                        })
                    }
                }else{
                    res.json({
                        message: "respective class routine have already deleted"
                    })
                }
    }
    catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}

//see  class routine by class name
const showClassRoutineController = async (req, res) => {
    try{
        const {className} = req.params //get the name of the class name by params
        const findClassRoutine = await ClassRoutine.findOne(
            {
                $and: [ { className }, { "status.isDeleted": false } ]
            }
        )
        if(findClassRoutine){
            const classRoutine = findClassRoutine //store the data here
            res.json({
                message: `found class routine of class ${(classRoutine.className).toLowerCase()}`,
                classRoutine
            })
        }else{
            res.status(404).json({
                message: "Class routine not found/ is not created "
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}

//export part
module.exports = {
    createClassRoutineController,
    updateClassRoutineController,
    deleteClassRoutineController,
    showClassRoutineController
}