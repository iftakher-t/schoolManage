        
const getExpress = require("express")
const fileUpload = require("../../middleware/fileUploader") // file uploader  
// const imgUpload = require("../../middleware/imageUpload") //image upload middleware  
const auth = require("../../middleware/auth")  //auth middleware
const {permission} = require("../../middleware/permission")  
const route = getExpress.Router()

const {
    loginController, 
    updatePasswordController, 
    forgotPasswordController, 
    resetPasswordController, 
    updateProfilePictureController,
    viewOwnProfileController
        } = require("../controllers/commonUserController") 

route.post("/login", loginController)
route.post("/update/password/:id",auth,permission(["admin","teacher","student"]), updatePasswordController)
route.post("/forgotPassword",forgotPasswordController)
route.post("/resetPassword",resetPasswordController)
route.post("/update/profilePicture",auth,permission(["admin","teacher","student"]), fileUpload.single("profilePicture") ,updateProfilePictureController)

route.get("/profile/view",auth,permission(["admin","teacher","student"]), viewOwnProfileController) //!!problem

//export part
module.exports = route