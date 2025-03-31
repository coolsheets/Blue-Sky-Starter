import { disconnectDb } from "../db.js";
import { findAllHeroes } from "../models/superheroes.js";

const heroes = await findAllHeroes()
console.log(heroes)

await disconnectDb()