const Class = require("../../models/Class")
const bcrypt = require("bcrypt")
// const { classValidation } = require("../../validator/classValidator")
const User = require("../models/User")
const ClassRoutine = require("../models/classRoutine")
// const routineValidation = require("../../validator/classRoutine")
const Syllabus = require("../models/Syllabus")
const syllabusValidation = require("../../validator/syllabus")

//creat a class
const newCLassController = async (req, res) => {
    try{
        const {error} = classValidation.validate(req.body)
        if(error){ //if there have any error during validation operation
            console.log(error);
            res.json({
                message: "class validation error",
                error
            })
        }else{
            const newClass = new Class(req.body) //create the class 
            const saveNewClass = await newClass.save() //save the new class
            if(saveNewClass){
                res.status(201).json({
                    message: "new class has been created successfully",
                    saveNewClass
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


//update class
const updateClassController = async (req, res) => {
    try{
        const {className} = req.params //get the class name from params
        const findClass  = await Class.findOne({className}) //find the class from the database
        if(findClass){
            const updateTheClass = await Class.updateOne(
                {
                    className
                }, //query
                {
                    $set: req.body
                }, //update data
                {} //option
            ) //find the student and update data
            if(updateTheClass){
                res.json({
                    message: `Class ${findClass.className} has updated successfully`
                })
            }else{
                res.json({
                    message: "update failed"
                })
            }
        }else{
            res.json({
                message: "Class not found"
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

//delete class 
const deleteClassController = async (req, res) => {
    try{
        const {className} = req.params //get the class name from params
        const findTheClass = await Class.findOne({className}) //find the expected class from database
        if(findTheClass){
            const {isDeleted} = findTheClass
            if(isDeleted == false){
                const deleteClass = await Class.updateOne(
                    {
                        className
                    }, //querry
                    {
                        $set:{
                            isDeleted: true,
                        }
                    }, //update part
                )
                if(deleteClass){
                    res.json({
                        message: `Class ${findTheClass.className} is deleted `
                    })
                }
            }else{
                res.json({
                    message:  `Class ${findTheClass.className} is already deleted `
                })
            }
        }else{
            res.json({
                message: "Class not found"
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

//view all class list
const viewClassController = async (req, res) => {
    try{
        // const {className} = req.params //get the class name from the params
        const findClass = await Class.find() //find the class according to the params value
        if(findClass){
            res.json({
                message: `All Classes found`,
                findClass
            })
        }else{
            res.status(404).json({
                message: "Class not found"
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
    newCLassController,
    routineController,
    creatSyllabusController,
    updateClassController,
    deleteClassController,
    viewClassController
}   