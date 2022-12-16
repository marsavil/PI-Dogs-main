const { Router } = require('express');
const dogsRoutes = require('./dogs');
const tempermentsRoutes = require('./temperaments');
const paramRoute = require('./params')
const createRoute = require('./dog')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRoutes);
router.use('/temperaments', tempermentsRoutes);
router.use('/dogs', paramRoute);
router.use('/dog', createRoute);


module.exports = router;

router.get('/dogs', async (req, res) =>{
    const name = req.query.name;
    let allDogs = await getAllDogs();
    if(name){
        let dogByQuery = await allDogs.filter( dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        dogByQuery.length ?
        res.status(200).send(dogByQuery):
        res.status(404).send(`Sorry, we couldn't find ${name} in our registry`)
    } else {
        res.status(200).send(allDogs)
    }
})
router.get('/dogs/:idRaza', async (req, res) => {
    const {idRaza} = req.params;
    let allDogs = await getAllDogs();
    const dogById = allDogs.filter( dog => dog.id == idRaza)
    dogById.length ?
    res.status(200).json(dogById):
    res.status(404).send(`${idRaza} is not a valid id`) 

})
// se mapean los temperamentos de todos los perros, tanto en api como en db y se almacenan en la tabla Temperament
router.get('/temperaments', async (req, res) => {
    let allDogs = await getAllDogs();
    const apiTemperaments = allDogs.map( dog => dog.temperament);
    const temperaments = apiTemperaments.toString().split(',');
    temperaments.forEach(t => {
        if(t!== ""){
            Temperament.findOrCreate({
                where : { name: t}
            }) 
        }
 
    })
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);

})
router.post('/dogs', async (req, res) => {
    const {name, height, weight, lifeYears, createdInDb, temperament} = req.body;
    let createdDog = await Dog.create({
        name: capitalize(name),
        height: height,
        weight: weight,
        lifeYears: lifeYears,
        createdInDb: createdInDb
    })

    let temperamentInDb = await Temperament.findAll({
        where: {name: temperament}
    })

    createdDog.addTemperament(temperamentInDb)
    res.json(createdDog)
})



module.exports = router;
