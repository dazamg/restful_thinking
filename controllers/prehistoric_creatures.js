const express = require('express')
const router = express.Router()

const fs = require('fs')

router.get('/', (req, res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric_creatures)
    let newFilter = req.query.type
    console.log(newFilter)
    if(newFilter){
        prehistoricData = prehistoricData.filter(prehistoric_creature=>{
            return prehistoric_creature.type.toLowerCase() === newFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/index', {prehistoric_creatures: prehistoricData})
})

router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new')
})

router.get('/:idx', (req, res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')

    let prehistoricData = JSON.parse(prehistoric_creatures)
    let prehistoricIndex = req.params.idx

    // console.log(prehistoric_creature[creatureIndex])

    res.render('prehistoric_creatures/show',{prehistoric_creatures: prehistoricData[prehistoricIndex], creatureId: prehistoricIndex})
})

router.post('/', (req, res)=>{
    let prehistoric_creatures=  fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData=JSON.parse(prehistoric_creatures)
    prehistoricData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(prehistoricData))
    //redirect to the GET / dinosaurs route(index)
    res.redirect('/prehistoric_creatures')
})



module.exports = router;