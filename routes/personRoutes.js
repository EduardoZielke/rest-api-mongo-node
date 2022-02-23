const express = require('express')
let router = express.Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {

    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({error:'O nome é obrigatório!'})
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida no sistema com suecesso!'})
    } catch (error) {
        res.status(500).send({error: error})
    }
})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).send({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.body.id
    
    try {
        const person = await Person.findOne({_id: id}).exec()

        if(!person) {
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).send({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    
    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.updateOne({_id: id}, person)
        res.status(200).json(person)
    } catch {
        res.status(422).json({message: 'O usuário não foi encontrado!'})
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        await Person.findByIdAndDelete(id)
        res.status(200).json({message: 'Usuário deletado com sucesso!'})
    } catch (error) {
        res.status(500).send({error: error})
    }
})

module.exports = router