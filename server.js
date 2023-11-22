const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const bodyParser = require('body-parser')
const path = require('path')
const { title } = require('process')
const { Console } = require('console')

const app = express()
const port = 5000

mongoose.connect('mongodb://0.0.0.0:27017/BookDB' ,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



app.use(bodyParser.urlencoded({extended:true}))



app.get('/' , async (req,res) => {

    const books = await Book.find()
    
   res.render('index',{books})


})

app.post('/add', async (req , res) => {

const  {id,title, version, year, author} = req.body   

var book = await Book.findOne({'id' : id})

if(book)
{
    console.log(book)
    await book.updateOne({'title' : title,'version' : version,'year' : year,'author' : author});
}
else
{
    book = new Book({id,title, version, year, author})
    await book.save()
}

res.redirect('/')

})

app.post("/delete",async (req,res) => {

const  {id} = req.body 

await Book.deleteOne({'id' : id})

res.redirect('/')

})


app.listen(port, () => console.log("Server connected :" + port))