const router = require('express').Router()
const fileuploader = require('../../middleware/fileUploader')
  
const { 
    createTeacherController,
    updateTeacherInfoController,
    TeacherdeleteController,
    changeactivityController,
    allTeacherGetController,
// --------------------------------
    teacherLoginController,
    // paginationController,
    // addressUpdateController,
    // passwordResetController,
    // createAQuestionController,
    //resultGetController
    profileImageChangeController,
    
                } = require('../controllers/teacherController')

    const Auth = require('../../middleware/auth')
    const {permission} = require('../../middleware/permission')

    router.post('/register',fileuploader.single('image'), createTeacherController) 
    router.put('/update/:id', Auth, updateTeacherInfoController)
    router.delete('/delete/:id', Auth,permission(['admin','teacher']), TeacherdeleteController)  // , permission([admin]) problem
    router.delete('/delete-permanent/:id', Auth, permission(['admin','teacher']), TeacherdeleteController) // , permission([admin]) problem
    router.put('/address-update/:id', Auth, permission(['admin']), changeactivityController)
    router.get('/allteacher', allTeacherGetController) // permission(['admin']),
    router.post('/login', teacherLoginController)

    router.put('/profileimage/:id', fileuploader.single('image'), profileImageChangeController)
    // router.post('/login', teacherLoginController)
    // // router.get('/', Auth,permission([admin]), uniqueUserGetController)
    // router.put('/address-update/:id', Auth, addressUpdateController)

    // router.put('/reset-password/:id', Auth, passwordResetController)

    // router.get('/users', paginationController)
    // router.get('/get-users:page', paginationController)

module.exports =router