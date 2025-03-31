import { disconnectDb } from "../db.js";
import { findAllCities } from "../models/cities.js";

const cities = await findAllCities()
console.log(cities)

await disconnectDb()