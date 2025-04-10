import { Router } from "express";
import { createReaction,findAllReactions,findReactionByVideoURL } from "../models/reactions.js";

const router = Router();

router.get('/', async function (req, res) {
    try {
        const data = await findAllReactions()
        res.send(data)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.post('/', async (req, res) => {
    const { Video_URL,
        Reaction_Type } = req.body

    if (req.body) {
        const data = createReaction(Video_URL,  
            Reaction_Type)
        return res.send(data)
    }
    else {
        return res.sendStatus(400)
    }
})


router.get('/:videourl', async function (req, res) {
    const videourl = req.params.videourl
    try {
        const data = findReactionByVideoURL(videourl)
        res.send(data)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }   
})

export default router