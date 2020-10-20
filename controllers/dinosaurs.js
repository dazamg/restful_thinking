const express = require('express')
const router = express.Router()

const fs=require('fs')
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){
       dinoData = dinoData.filter(dino=>{
           return dino.name.toLowerCase() === nameFilter.toLowerCase()
       })
} 
    console.log(dinoData)
    res.render('dinosaurs/index', {dinosaurs:dinoData})    //this is what you type in local host
})
// NEW* DINO ROUTE //
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new')
})
//SHOW DINO ROUTE 
router.get('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    //get array index from url parameter
    let dinoIndex = req.params.idx

    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})
//  DINO POST ROUTE //
router.post('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) // push the new dino to the array
    //save the new dinoData array to the dinosaurs.json file
    // JSON.stringfy  does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
    console.log(req.body)
})
module.exports = router;






