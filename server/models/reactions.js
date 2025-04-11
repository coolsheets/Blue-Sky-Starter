import { connectDb } from "../db.js";

const mongoose = await connectDb();


const reactionSchema = new mongoose.Schema({
    Video_URL: String,
    Reaction_Type: String,//like, dislike, heart icon   
})


// Models
const Reaction = mongoose.model('Reaction', reactionSchema, 'Reactions')

// Functions to expose to the outside world!
export async function createReaction(Video_URL, Reaction_Type) {
    const newReaction = await Reaction.create({
        Video_URL,
        Reaction_Type
    })
    
    return newReaction
}

export async function findAllReactions() {
    const reactions = await Reaction.find()
    return reactions
}

export async function findReactionByVideoURL(Video_URL) {
    const data = await Reaction.find({Video_URL: Video_URL})
    return data
}
