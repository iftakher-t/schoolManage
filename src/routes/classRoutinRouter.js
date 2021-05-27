const router = require('express').Router()
const fileuploader = require('../../middleware/fileUploader')

// const imgUpload = require("../../middleware/imageUpload") //image upload middleware
const auth = require("../../middleware/auth")
const {permission} = require("../../middleware/permission")
  
const {
    createClassRoutineController,
    updateClassRoutineController,
    deleteClassRoutineController,
    showClassRoutineController} = require("../controllers/classRoutineController")


router.put("/classRoutine/create/:className",auth, permission(["admin"]),  createClassRoutineController)
router.put("/classRoutine/update/:className",auth, permission(["admin"]),  updateClassRoutineController)
router.put("/classRoutine/delete/:className", auth, permission(["admin"]), deleteClassRoutineController)
router.get("/classRoutine/show/:className",auth, permission(["admin"]), showClassRoutineController)

module.exports = router