const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {getApiData} = require('../calls/callsToApi');
const {getDbData} = require('../calls/callsToDb');
const router  = Router();
const express = require('express');

router.use(express.json())

router.get('/:idRaza', async (req, res) => {
    const {idRaza} = req.params;
    console.log(idRaza)
    const dogsFromApi = await getApiData();
    const dogsFromDb = await getDbData();
    let allDogs = await dogsFromApi.concat(dogsFromDb);
    const dogById = await allDogs.filter( dog => dog.id == idRaza )
    dogById.length ?
    res.status(200).json(dogById):
    res.status(404).send(`${idRaza} is not a valid id`)
})

module.exports = router;