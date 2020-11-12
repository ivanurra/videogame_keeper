const mongoose  = require ("mongoose")
const Schema = mongoose.Schema

const videogameSchema = new Schema({
    name: {type: String, required: true},
    platform: {type: [String]},
    genre: {type: [String]},
    developer: {type: String},
    releaseDate: {type: Date},
    pegi: {type: String}
})

const Videogame = mongoose.model('Videogame', videogameSchema)

module.exports = Videogame