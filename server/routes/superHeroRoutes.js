import { Router } from "express";

const router = Router();


// list all superheros
router.get('/', async function (req, res) {
    console.log('In get for all superheroes')
    console.log(req.query)

    try {
        // do something with them
        res.send([
            {name: "Superman"},
            {name: "Ironman"},
            {name: "Spiderman"},
            {name: "Black Panther"},
            {name: "Spawn"}
        ])
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// create a new superhero
router.post('/', async (req, res) => {
    console.log('Incoming POST on /api/superheroes with data')
    console.log(req.body)

    if (req.body) {       
        return res.send("created a hero")
    }
    else {
        return res.sendStatus(400)
    }
})

// get a particular superhero
router.get('/:heroId', async function (req, res) {
    console.log('Handling request for individual hero')
    const id = req.params.heroId
    console.log(req.params)
    try {
        res.send("got a hero name")
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