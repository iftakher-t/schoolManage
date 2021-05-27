const Syllabus = require('../models/Syllabus')

const { syllabusValidation ,options } = require('../../validator/syllabusValidation')

//creat a syllabus
const creatSyllabusController = async (req, res) => {
    const {error} = syllabusValidation.validate(req.body)
    if(error){
        res.json({
            message: "syllabus validation error",
            error
        })
    }else{
        
        const newSyllabus = new Syllabus({...req.body}) //create the new syllabus
        
        const data = await newSyllabus.save() //save the data into the database
        if(data){
            res.status(201).json({
                message: "new syllabus has been created",
            })
        }else{
            res.json({
                message: "Syllabus creation failed"
            })
        }
    }
} 

const updateSyllabusController = async (req,res)=>{
    try{
        await Syllabus.findByIdAndUpdate(
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

const SyllabusdeleteController = async (req,res)=>{
    try{
        const data = await Syllabus.findOneAndUpdate(
            {_id:req.params.id},
            { $set:{
                isDeleted : true,
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

const allSyllabusGetController = async (req,res)=>{
    try{
        const sylabus = await Syllabus.find()
        if(sylabus.length){
            res.status(200).json({
                result: sylabus 
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


module.exports = { 
    creatSyllabusController,
    updateSyllabusController,
    SyllabusdeleteController,
    allSyllabusGetController,

            }