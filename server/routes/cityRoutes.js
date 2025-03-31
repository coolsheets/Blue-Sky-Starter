import { Router } from "express";
import { createCity, findAllCities, findCityById } from "../models/cities.js";

const router = Router();

// list all cities
router.get('/', async function (req, res) {
    try {
        const cities = await findAllCities()
        res.send(cities)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// create a new city
router.post('/', async (req, res) => {
    const {name} = req.body

    if (req.body) {       
        const city = createCity(name)
        return res.send(city)
    }
    else {
        return res.sendStatus(400)
    }
})

// get a particular city
router.get('/:cityId', async function (req, res) {
    const id = req.params.cityId
    try {
        const city = findCityById(id)
        res.send(city)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

export default router