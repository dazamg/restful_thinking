const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
//file systems 
const creature = require('./controllers/prehistoric_creatures');
const dina = require('./controllers/dinosaurs');

const fs = require('fs')


app.use('/dinosaurs', dina)
app.use('/prehistoric_creatures', creature)

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(8000, ()=>{
    console.log('Im listening...')
})