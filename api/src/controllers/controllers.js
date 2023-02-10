const axios = require('axios');
const { Dog, Temperamento } = require("../db.js");
const { API_KEY } = process.env;
const urlApi = `https://api.thedogapi.com/v1/breeds?api_key={API_KEY}`;
let results;

const getApiDogs = async ()=> {
    await axios.get(urlApi)
        .then(res => results = res.data)
        .catch(error => console.log(error));
    return results
}

const getById = async(id) => {
    const apiDB = await getApiDogs();
    const filtered = apiDB.filter(elem => elem.id == id);
    return filtered;
}

//aqui va la funcion para llamar por nombre

const addDog = async (name, altura, peso, anosDeVida) =>{
    const newDog = await Dog.create({name, altura, peso, anosdeVida});
    return newDog;
}

const getTemperamento = async() => {
    const findTemp = await Temperamento.findAll();
    return findTemp;
}

module.exports = {
    getApiDogs,
    getById,
    addDog,
    getTemperamento
}