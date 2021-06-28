
const bcrypt = require("bcrypt")
require("dotenv").config
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const nodemailer = require("nodemailer")
const fileSystem = require("fs")

const securityKey = process.env.JWT_KEY //get the security code from .env file
const userName = process.env.USER //get the user for nodemailer
const password = process.env.PASSWORD //get the password of auth account's for nodemailer

const {
    passwordValidation:passwordValidation, 
    resetPasswordValidation } = require("../../validator/passwordValidator") 

const Admin = require("../models/Admin")
const Student = require("../models/Student") 
const Teacher = require("../models/Teacher")
const User = require("../models/User")

//login controller 
const loginController = async (req, res) => {
    try{
        // const {userId, email, password, userType} = req.body
        const { email, password, userType} = req.body

        if(userType === "admin"){    //admin login controller
            const isValidUser = await Admin.findOne(
                {
                    $and: [ { userId }, { "isDeleted": false }]
                }
            ) //find the user
            if(isValidUser){
                const user = isValidUser //get the user
                const isPasswordMatch = await bcrypt.compare(password, user.password) //check is the password have been matched or not
                if(isPasswordMatch){
                    const data = {
                        id: user._id,
                        userId: user.userId,
                        userType: user.userType
                    }//get the data to make it a token
                    const token = jwt.sign(data, securityKey, {expiresIn: "10d"}) //token expire in 10 days
                    res.status(202).json({
                        message: "Successfully login",
                        token
                    })//if password and userId have matched

                }else{
                    res.status(406).json({
                        message: "Password wrong"
                    })
                }
            }else{
                console.log("User not found");
                res.status(404).json({
                    message: "user not found"
                })
            }
            
        } else if(userType == "student"){ //student login controller
            const isValidUser = await Student.findOne(
                 {
                    $and: [ { userId }, {"academicInfo.isDeleted": false } ]
                }
            ) //find the user
            if(isValidUser){
                const user = isValidUser //get the user
                const isPasswordMatch = await bcrypt.compare(password, user.password) //check is the password have been matched or not
                if(isPasswordMatch){
                    const data = {
                        id: user._id,
                        userId: user.userId,
                        userType: user.userType
                    }//get the data to make it a token
                    const token = jwt.sign(data, securityKey, {expiresIn: "10d"}) //token expire in 10 days
                    res.status(202).json({
                        message: "Successfully login",
                        token
                    })//if password and userId have matched

                }else{
                    res.status(406).json({
                        message: "Password wrong"
                    })
                }
            }else{
                console.log("User not found");
                res.status(404).json({
                    message: "user not found"
                })
            }
        }else if(userType == "teacher"){   //teacher login controller

            const isValidUser = await Teacher.findOne({ $and:[{email},{"officalInfo.isDeleted":false} ]}) //find the user

            if(isValidUser){
                const user = isValidUser //get the user
                const isPasswordMatch = await bcrypt.compare(password, user.password) //check is the password have been matched or not
                if(isPasswordMatch){
                    const data = {
                        id: user._id,
                        userId: user.userId,
                        userType: user.userType
                    }//get the data to make it a token
                    const token = jwt.sign(data, securityKey, {expiresIn: "10d"}) //token expire in 10 days
                    res.status(202).json({
                        message: "Successfully login",
                        token
                    })//if password and userId have matched

                }else{
                    res.status(406).json({
                        message: "Password wrong"
                    })
                }
            }else{
                console.log("User not found");
                res.status(404).json({
                    message: "user not found"
                })
            }
        }else{
            res.json({
                message: "email or user type invalid"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            err
        })
    }
}

const updatePasswordController = async (req, res) => {
    try{
        const { id } = req.params; //get the id from params
        const headerToken = req.header("Authorization") //get the jwt token from header
        const token = jwtDecode(headerToken) //get the token object 
        const userType = token.userType //get the user type from token of authorization
        const {oldPassword, newPassword, confirmPassword} = req.body // get the input
        const hashedNewPassword = await bcrypt.hash(newPassword, 10) //hash the new password

        const {error} = passwordValidation.validate(req.body) //check is the password is valid or not 
        if(error){
            res.json({
                message: "joi validatoin error",
                error
            }) //sent a error message of validation
        }else{
                if(userType == "admin"){    //check the user type
                    const isValidUser = await Admin.findOne({_id: id}) //find the user
                    if(isValidUser){
                        //is the old password is right or wrong just check it
                        const user = isValidUser
                        const isOldPassword = await bcrypt.compare(oldPassword, user.password ) //check is it valid old password or not
                        if(isOldPassword){
                            //check is the old password is same as new one
                            const isSamePassword = await bcrypt.compare(newPassword, user.password) //check is it same as database store password or not
                            if(isSamePassword){
                                res.status(406).json({
                                    message: "you have insert you old password"
                                })
                            }else{
                                //get the new password and update it into the data base
                                const isUpdated = await Admin.findByIdAndUpdate(
                                    {_id: id},
                                    {
                                        $set: {
                                            password: hashedNewPassword //change the new password
                                        },
                                        $currentDate:{
                                            "modification.updatedAt": true //update the updateAt field
                                        }
                                    },
                                    {}
                                )
                                if(isUpdated){
                                    res.json({
                                        message: "password has been changed successfully"
                                    })
                                }else{
                                    res.json({
                                        message: "password update failed"
                                    })
                                }
                            }
                            
                        }else{
                            res.status(406).json({
                                message: "old password does not match"
                            })
                        }
                    }else{
                        console.log("User not found");
                        res.status(404).json({
                            message: "user not found"
                        })
                    }
                }else if(userType == "student"){  //check the user type student
                    const isValidUser = await Student.findOne({_id: id}) //find the user
                    if(isValidUser){
                        //is the old password is right or wrong just check it
                        const user = isValidUser
                        const isOldPassword = await bcrypt.compare(oldPassword, user.password ) //check is it valid old password or not
                        if(isOldPassword){
                            //check is the old password is same as new one
                            const isSamePassword = await bcrypt.compare(newPassword, user.password) //check is it same as database store password or not
                            if(isSamePassword){
                                res.status(406).json({
                                    message: "you have insert you old password"
                                })
                            }else{
                                //get the new password and update it into the data base
                                const isUpdated = await Student.findByIdAndUpdate(
                                    {_id: id},
                                    {
                                        $set: {
                                            password: hashedNewPassword //change the new password
                                        },
                                        $currentDate:{
                                            "modification.updatedAt": true //update the updateAt field
                                        }
                                    },
                                    {}
                                )
                                if(isUpdated){
                                    res.json({
                                        message: "password has been changed successfully"
                                    })
                                }else{
                                    res.json({
                                        message: "password update failed"
                                    })
                                }
                            }
                            
                        }else{
                            res.status(406).json({
                                message: "old password does not match"
                            })
                        }
                    }else{
                        console.log("User not found");
                        res.status(404).json({
                            message: "user not found"
                        })
                    }
                }else if(userType == "teacher"){   //work on user type teacher
                    const isValidUser = await Teacher.findOne({_id: id}) 
                    if(isValidUser){ //check for old password is right or wrong ?
                        const user = isValidUser
                        const isOldPassword = await bcrypt.compare(oldPassword, user.password ) //check is it valid old password or not
                        if(isOldPassword){ //check is the old password is same as new one
                            const isSamePassword = await bcrypt.compare(newPassword, user.password) //check is it same as database store password or not
                            if(isSamePassword){
                                res.status(406).json({
                                    message: "you have insert you old password"
                                })
                            }else{ 
                                //check the new password and confirm newpassword are same
                                if(newPassword !== confirmPassword){
                                    res.json({
                                        message: "new password and confirm newpassword should be same"
                                    })
                                }else{

                                //get the new password and update it into the data base
                                const isUpdated = await Teacher.findByIdAndUpdate( {_id: id},
                                    { $set: { password: hashedNewPassword }, //change the new password
                                      $currentDate:{ "modification.updatedAt": true  } //update the updateAt field
                                    },
                                    )
                                if(isUpdated){
                                    res.json({
                                        message: "password has been changed successfully"
                                    })
                                }else{
                                    res.json({
                                        message: "password update failed"
                                    })
                                }
                                }
                            }
                            
                        }else{
                            res.status(406).json({
                                message: "old password does not match"
                            })
                        }
                    }else{
                        res.status(404).json({
                            message: "user not found"
                        })
                    }
                }
            }        
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            err
        })
    }
}

const forgotPasswordController = async (req, res) => {
    try{
        let recoveryToken //send token to the user email
        let receiverEmail //for receivers email

        const {email} = req.body //get the email from body
        let user
        let teacher = await Teacher.findOne({email});
        if(teacher) user = teacher;
        else {
            user = await Student.findOne({email});
        }

        // if(!user){
        //  user = await Student.findOne({email}) //get the user from 2 collection
        // }else{
        //  user = await Teacher.findOne({email}) //get the user from 2 collection
        // }
    console.log("User is " + user)
            if(user){
                   let {email} = user.email //get the email from database
                    const {_id} = user
                    const tokenData = {
                        id: user._id,
                        useType: user.userType 
                    }//recovery mail token data
                    let token = jwt.sign(tokenData, securityKey, {expiresIn: "55m"}) //store the user id into a token which is valid within 15 min
                    //store the token to the user schema
                    await Admin.findByIdAndUpdate(
                        { _id //get the user by id from admin
                        },
                        { recoveryToken: token //insert the token
                        },
                        {} //option
                    )
                    receiverEmail = email //store the receiver email 
                    recoveryToken = token 
            }else{
            res.status(404).json({
                "message": "You are not a user"
            })
        }
        
        //nodemailer part 
        const transporter  = nodemailer.createTransport({
            service : "gmail",
            auth:{
                user: userName,
                pass: password
            }
        }) //transporter part

        //mailOption part
        const mailOption = {
            from: 'hmdiftakher@gmail.com', // sender email
            to: receiverEmail, // list of receivers
            subject: "reset password", // Subject line
            html: `<h3>You verification token is</h3> 
                    <p>${recoveryToken}</p>`
        }
        //send the mail
        transporter.sendMail(mailOption, (err, data) => {
            if(err){
                console.log(err);
                res.json({
                    message: "problem to delivered the mail to the sender",
                    err
                }) //if there have some error during the email send
            }
            res.status(200).json({
                message: `message has been successfully send to ${receiverEmail}`
            })
        }) //send the mail here
    }
    catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}

const resetPasswordController = async (req, res) => {
    try{
        const {error} = resetPasswordValidation.validate(req.body)
        if(error){                  //if there have some validation error in joi validator
            console.log(error);
            res.json({
                error
            })
        }else{
            const {token, newPassword} = req.body //get the token from req body
            const hashed = await bcrypt.hash(newPassword, 10) //hash the new password
            if(hashed){
                const isValidToken = jwt.verify(token, securityKey) //check is it a valid token or not
                if(!isValidToken){ //if there have problem in token validation
                    res.json({
                        message: "token is not valid"
                    })
                }else{
                    const tokenData = isValidToken //store the token data here this will decode auto the token so we don't need to decode it with jwt decoder
                    const {id, useType:userType} = tokenData; //get id from token
                    if(userType == "admin"){ //if the user is admin
                        const user = await Admin.findOne(
                            {
                                _id: id
                            }
                        ) //query and find the user from data base
                        if(user){
                            const updatePassword = await Admin.findByIdAndUpdate(
                                { 
                                    _id: id //query
                                }, 

                                {   
                                    $set: {
                                        password : hashed,
                                        recoveryToken: ""
                                    },
                                    $currentDate: {
                                        "modification.updatedAt": true
                                    }

                                },//update part

                                {} //option
                            )
                            if(updatePassword){
                                res.status(200).json({
                                    message: "password has been changed successfully"
                                })
                            }else{
                                res.status(400).json({
                                    message: "password update error"
                                })
                            }
                        }else{
                            res.status(404).json({
                                message: "user not found"
                            })
                        }
                    } else if (userType == "teacher"){ //if the user is a teacher
                        const user = await Teacher.findOne(
                            {
                                _id: id
                            }
                        ) //query and find the user from data base
                        if(user){
                            const updatePassword = await Teacher.findByIdAndUpdate(
                                { 
                                    _id: id //query
                                }, 

                                {   
                                    $set: {
                                        password : hashed,
                                        recoveryToken: ""
                                    },
                                    $currentDate: {
                                        "modification.updatedAt": true
                                    }
                                }, //updated part

                                {} //option
                            )
                            if(updatePassword){
                                res.status(200).json({
                                    message: "password has been changed successfully"
                                })
                            }else{
                                res.status(400).json({
                                    message: "password update error"
                                })
                            }
                        }else{
                            res.status(404).json({
                                message: "user not found"
                            })
                        }
                    }else if( userType == "student" ) {   //if the user is a student
                        const user = await Student.findOne(
                            {
                                _id: id
                            }
                        ) //query and find the user from data base
                        if(user){
                            const updatePassword = await Student.findByIdAndUpdate(
                                { 
                                    _id: id //query
                                }, 

                                {   
                                    $set: {
                                        password : hashed,
                                        recoveryToken: ""
                                    },
                                    $currentDate: {
                                        "modification.updatedAt": true
                                    }
                                }, //updated part
                                
                                {} //option
                            )
                            if(updatePassword){
                                res.status(200).json({
                                    message: "password has been changed successfully"
                                })
                            }else{
                                res.status(400).json({
                                    message: "password update error"
                                })
                            }
                        }else{
                            res.status(404).json({
                                message: "user not found"
                            })
                        }
                    }
                }
            }else{
                res.json({
                    message: "new password hashing problem"
                })
            }
        }  //if there have no validation error then execute the rest of the code
    }
    catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}

const updateProfilePictureController = async (req, res) => {
    try{
         const token = req.header("Authorization") //get the login token
         const tokenData = jwtDecode(token) //decode the token 
         const {id, userType} = tokenData //get the userId and user Type from login token
         if(userType == "admin"){ //if the user is admin
            const user = await Admin.findOne(
                {
                    _id: id //query and find the user
                }
            )
            if(user){ //if it is a valid user
                const OldProPicName = user?.personalInfo?.image //get the name of old profile image name
                const route = `E:/Topper/MERN/Project/school-management_backend/schoolManagement/documents/image/${OldProPicName}`
                const {filename} = req.file
                
                const insertNewProfilePic = await Admin.findByIdAndUpdate(
                    {
                        _id: id 
                    },
                    {
                        "personalInfo.image" : filename
                    },
                    {}
                ) //if insert new pic successfully
                if(insertNewProfilePic){
                    res.status(202).json({
                        message: `${user?.personalInfo?.name?.FirstName} ${user?.personalInfo?.name?.LastName}'s profile picture has been successfully updated `
                    })
                     //delete the previous image from folder
                    fileSystem.unlink(route, (err) => {
                            if(err){
                                console.log(err);
                                res.json({
                                    message:"previous image delete time error"
                                })
                            }
                    }) 
                }else{
                    res.json({
                        message: "profile picture upload failed"
                    })
                }
            }else{
                res.json({
                    message: "The user is not a Admin"
                })
            }
           
         }else if (userType == "student"){ //if the user is student
            const user = await Student.findOne(
                {
                    _id: id //query and find the user
                }
            )
            if(user){ //if it is a valid user
                const OldProPicName = user?.personalInfo?.profilePic //get the name of old profile image name
                const route = `E:/Topper/MERN/Project/school-management_backend/schoolManagement/documents/image/${OldProPicName}`
                const {filename} = req.file //get the new upload image's file name from input body
                const insertNewProfilePic = await Student.findByIdAndUpdate(
                    {
                        _id: id 
                    },
                    {
                        "personalInfo.profilePic" : filename
                    },
                    {}
                ) //if insert new pic successfully
                if(insertNewProfilePic){
                    res.status(202).json({
                        message: `${user?.personalInfo?.name?.FirstName} ${user?.personalInfo?.name?.LastName}'s profile picture has been successfully updated `
                    })
                     //delete the previous image from main folder
                    fileSystem.unlink(route, (err) => {
                            if(err){
                                console.log(err);
                                res.json({
                                    message:"previous image delete time error"
                                })
                            }
                    }) 
                }else{
                    res.json({
                        message: "profile picture upload failed"
                    })
                }

                

            }else{
                res.json({
                    message: "The user is not a Student"
                })
            }
         }else if(userType == "teacher") { //if the user is teacher
             const user = await Teacher.findOne(
                {
                    _id: id //query and find the user
                }
            )
            if(user){ //if it is a valid user
                const OldProPicName = user?.personalInfo?.image //get the name of old profile image name
                const route = `E:/Topper/MERN/Project/school-management_backend/schoolManagement/documents/image/${OldProPicName}`
                const {filename} = req.file //get the name of new upload file name 
                
                const insertNewProfilePic = await Teacher.findByIdAndUpdate(
                    {
                        _id: id 
                    },
                    {
                        "personalInfo.image" : filename //update value
                    },
                    {}
                ) //if insert new pic successfully
                if(insertNewProfilePic){
                    res.status(202).json({
                        message: `${user?.personalInfo?.name?.FirstName} ${user?.personalInfo?.name?.LastName}'s profile picture has been successfully updated `
                    })
                     //delete the previous image from folder
                    fileSystem.unlink(route, (err) => {
                            if(err){
                                console.log(err);
                                res.json({
                                    message:"previous image delete time error"
                                })
                            }
                    }) 
                }else{
                    res.json({
                        message: "profile picture upload failed"
                    })
                }
            }else{
                res.json({
                    message: "The user is not a Admin"
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

const viewOwnProfileController = async (req, res) => {
    try{
       const headerToken = req.header("Authorization")  //get the token from body header
       const isValidToken = jwt.verify(headerToken, securityKey) //check is it a valid token or not
       if(isValidToken){
            const tokenData = jwtDecode(headerToken) //decode the token data
            const {id, userType} = tokenData  //take the id and user type from the token
            if(userType == "admin"){ //if the user typ is admin
                const findAdmin = await Admin.findOne(
                    {
                        _id: id
                    }
                )//query data from data base
                if(findAdmin){
                    const adminProfile = findAdmin
                    res.json({
                        message: "admin found",
                        adminProfile
                    })
                }
            }else if (userType == "student"){
                const findStudent = await Student.findOne(
                    {
                        _id: id
                    }
                )//query data from data base
                if(findStudent){
                    const studentProfile = findStudent
                    res.json({
                        message: "student found",
                        studentProfile
                    })
                }
            } else if (userType == "teacher"){
                const findTeacher = await Teacher.findOne(
                    {
                        _id: id
                    }
                )//query data from data base
                if(findTeacher){
                    const teacherProfile = findTeacher
                    res.json({
                        message: "teacher found",
                        teacherProfile
                    })
                }
            }

        }else{
            res.json({
                message: "token is invalid"
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

module.exports = {
    loginController,
    updatePasswordController,
    forgotPasswordController,
    resetPasswordController,
    updateProfilePictureController,
    viewOwnProfileController
}
