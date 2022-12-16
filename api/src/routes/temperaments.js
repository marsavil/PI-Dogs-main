const { Router } = require('express');
const { Temperament } = require('../db');
const express = require('express');
const router = Router();
router.use(express.json())

router.get('/', async (req, res) => {
    const temperaments = await Temperament.findAll();
    res.status(200).json(temperaments)
})

module.exports = router;