const router = require('express').Router()
const fileuploader = require('../../middleware/fileUploader')
  
const { 
    creatSyllabusController,
    updateSyllabusController,
    SyllabusdeleteController,
    allSyllabusGetController,

                } = require('../controllers/syllabusController')

    const Auth = require('../../middleware/auth')
    const { permission } = require('../../middleware/permission')

    router.post('/create', creatSyllabusController) 
    // router.put('/update/:id', Auth, updateSyllabusController)
    // router.delete('/delete/:id', Auth, permission(['admin','teacher']), SyllabusdeleteController)  // , permission([admin]) problem
    // router.delete('/delete-permanent/:id', Auth, permission(['admin','teacher']), SyllabusdeleteController) // , permission([admin]) problem

    // router.get('/allsyllabus',permission(['admin']), allSyllabusGetController) // permission(['admin']),


module.exports =router