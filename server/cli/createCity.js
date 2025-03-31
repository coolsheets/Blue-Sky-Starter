import { disconnectDb } from "../db.js"
import { createCity } from "../models/cities.js"

if (process.argv.length < 3) {
    console.log("Usage: node createCity <name>")
    process.exit()
}

const name = process.argv[2]

const newCity = await createCity(name)
console.log('Created', newCity)

disconnectDb()