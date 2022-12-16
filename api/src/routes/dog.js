const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {getApiData} = require('../calls/callsToApi');
const {getDbData} = require('../calls/callsToDb');
const router = Router();
const express = require('express');

router.use(express.json())

//POST

router.post('/', async (req, res, next) => {
    const {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
        temperament,
    } = req.body;
    const capitalize = (str) => {
        let lower = str.toLowerCase();
        let initial = str.charAt(0);
        return initial.toUpperCase() + lower.slice(1)
    }
    try {
        const createdDog = await Dog.create({
            name: capitalize(name), 
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span,
            image
        });
        const allTemps = await Temperament.findAll()
        temperament.forEach(t => {
            let filterdedTemperament = allTemps.filter(temp => temp.name.toLowerCase() == t.toLowerCase())
            createdDog.addTemperament(filterdedTemperament)
        });
        
        res.status(200).send('Your Dog has been added successfully')
    } catch (error) {
        res.status(404).send(error)
    }


})

module.exports = router;