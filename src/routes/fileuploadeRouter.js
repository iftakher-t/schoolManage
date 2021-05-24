
const router = require('express').Router()

const {  
    singleUplodeController,
    multipleUplodeController } = require('../controllers/fileUplodeController')
const fileuploader = require('../../middleware/fileUploader')

router.post('/single' , fileuploader.single('image'), singleUplodeController)
router.post('/multiple' , fileuploader.array('images',3), multipleUplodeController)

module.exports = router