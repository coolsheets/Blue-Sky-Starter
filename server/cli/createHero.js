import { disconnectDb } from "../db.js"
import { createHero } from "../models/superheroes.js"

if (process.argv.length < 5) {
    console.log("Usage: node createHero <name> <alias> <power> <power> <power>")
    process.exit()
}

const name = process.argv[2]
const alias = process.argv[3]
const powers = process.argv.slice(4)

console.log('Creating ' + name)
console.log(' with alias: ' + alias)
console.log(' and powers:' + powers)

const newHero = await createHero(name, powers, alias)
console.log('Created', newHero)

disconnectDb()