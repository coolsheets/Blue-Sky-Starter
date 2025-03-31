import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Schema 
const superheroSchema = new mongoose.Schema({
    name: String,
    powers: [ String ],
    alias: String,
})

// Models
const Superhero = mongoose.model('superhero', superheroSchema, 'superheroes')

// Functions to expose to the outside world!
export async function createHero(name, powers, alias) {
    const newHero = await Superhero.create({
        name,
        powers,
        alias
    })    
    return newHero
}

export async function findAllHeroes() {
    const heroes = await Superhero.find()
    return heroes
}

export async function findHeroById(id) {
    const hero = await Superhero.findById(id)
    return hero
}
