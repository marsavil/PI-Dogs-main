const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {getApiData} = require('../calls/callsToApi');
const {getDbData} = require('../calls/callsToDb');
const router = Router();
const express = require('express');

router.use(express.json())

//GET

router.get('/', async (req, res) => {
    const name = req.query.name;
    const apiInfo = await getApiData();
        //console.log(apiInfo)
    const dbInfo = await getDbData();
        //console.log(dbInfo)
    const availableData = apiInfo.concat(dbInfo) // se unifica la data de ambas fuentes

    try {
        if(name){
            const search = availableData.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
            if(!search.length){
                return res.status(404).send(`Sorry, we couldn't find ${name} in our registry`);
            }
            return res.status(200).json(search);
        }
        res.status(200).json(availableData);
        
        
    } catch (error) {
        res.status(404).send('aca esta el problema');
    };
});



module.exports = router;