
const router = require ('express').Router()
const fileuploader = require('../../middleware/fileUploader')
const Auth = require('../../middleware/auth')
const { permission } = require('../../middleware/permission')

const { 
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

    } = require('../controllers/studentController')

    router.post('/admit',fileuploader.single('image') ,permission(['admin']), admitSingleStudentController) //fileUploader.fields([{'bookimage'}]), problem 
    router.put('/update/:id',permission(['admin','teacher']), updateStudentInfoController)
    router.delete('/deletestudent/:id',permission(['admin','teacher']), studentDeleteController)
    router.put('/:id',permission(['admin','teacher']), changeActivityController)
    router.get('/view/:id', studentProfileViewController)
    router.get('/result/:id', viewResultController) // 609545238ffd9a37485bc186
 // -----------------------------------------------------
    router.put('/profileimage/:id',fileuploader.single('image') , profileImageChangeController)

    router.get('/allstudent',permission(['admin','teacher']), allStudentGetController)

    router.get('/', permission(['admin','teacher']), classwiseStudentGetController) // class wise


module.exports =router