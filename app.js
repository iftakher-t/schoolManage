const express = require('express');
const app = express();
require('dotenv').config();

// all routes
const routerAdmin = require('./src/routes/AdminRouter')
const routerStudent = require('./src/routes/studentRouter')
const routerTeacher = require('./src/routes/teacherRouter')

const commonUser = require('./src/routes/commonUserRouter')
const routerFileUpload = require('./src/routes/fileuploadeRouter')

const routerClassRoutine = require('./src/routes/classRoutinRouter')
const routerSyllabus = require('./src/routes/syllabusRouter')
const routerMcqQuestion = require('./src/routes/mcqQuestionRouter')

// const routerClass = require('./src/routes/classRouter')

const mongoose = require('mongoose');
// require all routers 
app.use(express.json()); 

app.use('/admin', routerAdmin)
app.use('/student', routerStudent)
app.use('/teacher', routerTeacher)

app.use('/login', commonUser)
app.use('/upload', routerFileUpload)

app.use('/class-routin', routerClassRoutine)
app.use('/syllabus', routerSyllabus)
app.use('/syllabus', routerMcqQuestion)


app.get('/', (req, res) => {
    res.send(`<h1> I am from root </h1>`)
})

app.get('*', (req, res) => {
    res.send(`<h1> Enter right url </h1>`)
})
// Database connection 
const url = process.env.MONGO_URL;

mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    })
    .then(() => {
        console.log('mongodb server connected...')
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`server listening on port ${port}`))
})
    .catch(err => console.log(err))





// const filterNonUnique = arr => {
//     let repeated = []
//     arr.forEach(function (el, ind) {
//         if (arr.indexOf(el, ind + 1) !== -1) {
//             repeated.push(el)
//         }
//     })

//     const mArr = arr.filter((el, ind) => arr.indexOf(el) === ind)
//     repeated = repeated.filter((el, ind) => repeated.indexOf(el) === ind)
//     repeated.forEach(el => mArr.splice(mArr.indexOf(el), 1))

//     return mArr
// }

// console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5]))
// console.log(filterNonUnique([11, 1, 1, 2, 2, 3, 4]))
// filterNonUnique(['Parves','Rabby','Parves','parves'])