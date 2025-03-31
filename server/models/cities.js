import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Schema 
const citySchema = new mongoose.Schema({
    name: String,
})

// Models
const City = mongoose.model('city', citySchema, 'cities')

// Functions to expose to the outside world!
export async function createCity(name) {
    const newCity = await City.create({
        name
    })    
    return newCity
}

export async function findAllCities() {
    const cities = await City.find()
    return cities
}

export async function findCityById(id) {
    const city = await City.findById(id)
    return city
}
