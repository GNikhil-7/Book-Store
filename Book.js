
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    id : Number,
    title: String,
    version : String,
    year : String,
    author : String
})

module.exports = mongoose.model('Book' , bookSchema)