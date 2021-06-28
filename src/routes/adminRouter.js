
const router = require ('express').Router()
const fileuploader = require('../../middleware/fileUploader')
const Auth = require('../../middleware/auth')
const { permission } = require('../../middleware/permission')

const { 
    admitSingleStudentController,
    updateStudentInfoController,
    studentDeleteController,
    changeStudentActivityController,
    studentProfileViewController,
    // ---------------------
    // profileImageChangeController,
    allStudentGetController,
    classwiseStudentGetController,
    viewResultController
    // questionSubmitController

    } = require('../controllers/adminController')
    
    const {
        allTeacherGetController
    } = require('../controllers/teacherController')

    router.post('/admit',fileuploader.single('image') , admitSingleStudentController) //fileUploader.fields([{'bookimage'}]), problem,,  permission(['admin']),
    router.put('/update/:id',permission(['admin','teacher']), updateStudentInfoController)
    router.delete('/deletestudent/:id',permission(['admin','teacher']), studentDeleteController) // temporary
    // router.delete('/deleteteacher/:id',permission(['admin','teacher']), teacherDeleteController) // temporary
    router.put('/:id',permission(['admin','teacher']), changeStudentActivityController)
    // router.put('/:id',permission(['admin']), changeTeacherActivityController)
    router.get('/view/:id', studentProfileViewController)
    router.get('/result/:id', viewResultController) // 609545238ffd9a37485bc186
 // -----------------------------------------------------
    // router.put('/profileimage/:id',fileuploader.single('image') , profileImageChangeController)

    router.get('/allstudent', allStudentGetController) //permission(['admin','teacher'])
    router.get('/allteacher', allTeacherGetController) //permission(['admin','teacher'])

    router.get('/', permission(['admin','teacher']), classwiseStudentGetController) // class wise


module.exports =router