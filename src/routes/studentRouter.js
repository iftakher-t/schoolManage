
const router = require ('express').Router()
const fileuploader = require('../../middleware/fileUploader')
const Auth = require('../../middleware/auth')
const { permission } = require('../../middleware/permission')

const { 
    updateStudentInfoController,
    studentDeleteController,
    studentProfileViewController,
    viewResultController
    // answerSubmitController

    } = require('../controllers/studentController')

    router.get('/view/:id', studentProfileViewController)
    router.get('/result/:id', viewResultController) // 609545238ffd9a37485bc186

    // student update some selected fileds only othe fild are fix
    router.put('/update/:id',permission(['admin','teacher']), updateStudentInfoController) 

    // temporary delete student
    router.delete('/deletestudent/:id',permission(['admin','teacher','student']), studentDeleteController) 

module.exports =router