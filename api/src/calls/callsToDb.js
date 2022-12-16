const { Dog, Temperament } = require('../db');

async function getDbData(){
    const data= await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })
    const formatedData = data.map(el => {
        let temp = el.temperaments.map(t => t.name)
        return {
            name: el.name,
            height_min: el.height_min,
            height_max: el.height_max,
            weight_min: el.weight_min,
            weight_max: el.weight_max,
            life_span: el.life_span,
            createdInDB: el.createdInDB,
            image: el.image,
            temperament: temp
        }
    })
    console.log(formatedData)
    return formatedData
};
getDbData()
module.exports = {
    getDbData
}