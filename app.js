const express = require('express');
const app = express();
require('dotenv').config();

// all routes
const routerA = require('./src/routes/adminRouter')
const routerTeacher = require('./src/routes/teacherRouter')
const routerFile = require('./src/routes/fileuploadeRouter')

const mongoose = require('mongoose');

// require all routers 

app.use(express.json()); 

app.use('/student', routerA)
app.use('/teacher', routerTeacher)
app.use('/upload', routerFile)

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