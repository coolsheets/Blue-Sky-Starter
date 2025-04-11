import { Router } from "express";
import { createCameraLocation, findAllCameraLocations, findCameraLocationById } from "../models/cameralocations.js";

const router = Router();

router.get('/', async function (req, res) {
    try {
        const data = await findAllCameraLocations()
        res.send(data)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.post('/', async (req, res) => {
    const { Camera_Name,
        Camera_URL,
        Quadrant,
        Camera_Location,
        Pointme } = req.body

    if (req.body) {
        const data = await createCameraLocation(Camera_Name,
            Camera_URL,
            Quadrant,
            Camera_Location,
            Pointme)
        return res.send(data)
    }
    else {
        return res.sendStatus(400)
    }
})


router.get('/:id', async function (req, res) {
    const id = req.params.id
    try {
        const data = await findCameraLocationById(id)
        res.send(data)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

export default router