const {Schema, model}= require('mongoose')

const routinSchema = new Schema({
    
    day : String,
    period : String,
    class: String,
})

module.exports = model('Routin', routinSchema)
