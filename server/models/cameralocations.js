import { connectDb } from "../db.js";

const mongoose = await connectDb();

// {
//     "_id": {
//       "$oid": "67ef1640ad4b95ab16bb5d20"
//     },
//     "Camera_Name": "Camera 87",
//     "Camera_URL": "http://trafficcam.calgary.ca/loc86.jpg",
//     "Quadrant": "SE",
//     "Camera_Location": "Stoney Trail / Deerfoot Trail SE",
//     "Point": "POINT (-113.9766063 50.9007257)"
//   }
// Schema 
const cameralocationSchema = new mongoose.Schema({
    Camera_Name: String,
    Camera_URL: String,
    Quadrant: String,   
    Camera_Location: String,
    Point: String,
})


// Models
const CameraLocation = mongoose.model('cameralocation', cameralocationSchema, 'cameralocations')

// Functions to expose to the outside world!
export async function createCameraLocation(Camera_Name, Camera_URL, Quadrant, Camera_Location, Point) {
    const newCameraLocation = await CameraLocation.create({
        Camera_Name,
        Camera_URL,
        Quadrant,   
        Camera_Location,
        Point
    })
    return newCameraLocation
}

export async function findAllCameraLocations() {
    const locations = await CameraLocation.find()
    return locations
}

export async function findCameraLocationById(id) {
    console.log("findCameraLocationById", id)
    const location = await CameraLocation.findById(new mongoose.Types.ObjectId(id))
    return location
}
