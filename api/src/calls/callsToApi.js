const axios = require("axios");
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;


const getApiData = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiData = await apiUrl.data.map(breed => {
        // se convierten las propiedades de tipo STRING a ARRAY, según requerimientos
        let temperament = [];
        if (breed.temperament) {    
            temperament = breed.temperament.split(", ");
        }
        return {
            id: breed.id,
            name: breed.name,
            height_min: breed.height.metric.split(' - ')[0],
            height_max: breed.height.metric.split(' - ')[1],
            weight_min: breed.weight.metric.split(' - ')[0],
            weight_max: breed.weight.metric.split(' - ')[1],
            temperament: temperament,
            life_span: breed.life_span,
            image: breed.image.url,
            createdInDb: false
        }
    })
    //console.log(apiData)
    return apiData;
  
    
};

async function getTemperaments() {
    let allDogs = await getApiData();
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

};

module.exports = {
    getApiData,
    getTemperaments
}