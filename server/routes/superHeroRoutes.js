import { Router } from "express";

import { createHero, findAllHeroes, findHeroById } from "../models/superheroes.js";

const router = Router();


// list all superheros
router.get('/', async function (req, res) {
    try {
        const heroes = await findAllHeroes()
        res.send(heroes)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// create a new superhero
router.post('/', async (req, res) => {
    const {name, powers, alias} = req.body

    if (req.body) {       
        const hero = await createHero(name, powers, alias)
        return res.send(hero)
    }
    else {
        return res.sendStatus(400)
    }
})

// get a particular superhero
router.get('/:heroId', async function (req, res) {
    const id = req.params.heroId
    try {
        const hero = findHeroById(id)
        res.send(hero)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.delete('/:heroId', async function(req, res) {
    console.log('Deleting ', req.params.heroId)
    res.sendStatus(200)
})



export default router