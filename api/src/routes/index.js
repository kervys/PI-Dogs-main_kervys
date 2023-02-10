const { signedCookie } = require('cookie-parser');
const { Router } = require('express');
const { getApiDogs, getById, addDog, getTemperamento } = require("../controllers/controllers");
const { Dog, Temperamento } = require("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req,res) => {
    try{
        const getDogsApi = await getApiDogs();
        const getDogsDB = await Dog.findAll();
        if(!getDogsDB){
            res.status(200).json(getDogsApi);
        } else {
            res.status(200).json([...getDogsApi, getDogsDB]);
        }
    }catch(err){
        res.status(400).send(err.message);
    }
});

router.get("/dogs?name=", async(req, res) => { //llama funcion en controllers para busqueda del dato
    try{

    }catch(err) {
        res.status(400).send(err.message);
    }
});

router.get("/dogs/:idRaza", async(req, res) => {
    try{
        const { idRaza } = req.params;
        const filteredRaza = await getById(idRaza);
        if(filteredRaza.length === 0) throw Error(`No se encuentra raza con el id:${idRaza}`);
        res.status(200).json(filteredRaza);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.post("/dogs", async (req, res) => {
    try {
        const {name, altura, peso, anosdeVida } = req.body;
        if(!name || !altura || !peso) throw Error("Faltan datos a completar");
        const newDog = await addDog(name, altura, peso, anosdeVida);
        res.status(201).json(newDog);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get("/temperaments", async (req, res) => {
    try{
        const results = await getTemperamento()
        res.status(200).json(results)
    } catch(err){
        res.status(400).send(err.message);
    }
});

module.exports = router;
