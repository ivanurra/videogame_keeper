const chalk         = require ("chalk")
const dotenv        = require ("dotenv")
const express       = require ("express")
const hbs           = require ("hbs")
const mongoose      = require ("mongoose")
const bodyParser    = require ('body-parser')

//CONSTANTS
const app = express()
const Videogame = require('./models/Videogame.js')

//CONFIGURATION .env
require('dotenv').config()

//Moongose configuration
mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then((result) =>{
    console.log(`Connected to MongoDB! DB used: ${result.connections[0].name}`)
})
.catch((error) =>{
    console.log(`Error: ${error}`)
})

//CONFIGURATION hbs
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

//BODY PARSER
app.use(bodyParser.urlencoded({extended: true}))

//Static folder
app.use(express.static(__dirname + '/public'))

//ROUTES
app.get('/', (req, res, next)=>{

    res.render('home')
})

app.get('/new-videogame',(req, res, next)=>{
    res.render('newVideogame')
})

app.get('/all-videogames',(req, res, next)=>{
    Videogame.find({}, {name:1 , _id: 1})
    .then((videogames)=>{
        res.render('allVideogames', {videogames})
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
})

app.post('/delete-game/:id', (req, res, next)=>{
    const id = req.params.id
    Videogame.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/all-videogames')
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
})

app.get('/edit-videogame/:id', (req, res, next)=>{
    const _id = req.params.id
    Videogame.findById(id)
    .then(()=>{
        res.render('editForm', result)
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
})

app.post('/edit-videogame/:id', (req, res, next)=>{
    // const id = req.params.id
    // Videogame.findByIdAndUpdate(id, )
})

app.get('/videogame/:id', (req, res, next)=>{
    const videogameID = req.params.id

    Videogame.findById(videogameID)
    .then((result)=>{
        // res.send(result)
        res.render('singleVideogame', result)
    })
    .catch((error)=>{
        console.log(error)
        res.send(error)
    })
})

app.post('/new-videogame', (req, res, next)=>{

    const splitString = (_string)=>{
        const genreString =  _string
        const splittedGenreString = genreString.split(',')
        return splittedGenreString
    }

    const arrayPlatform = splitString(req.body.platform)
    const arrayGenre = splitString(req.body.genre)

    const newVideogame = {...req.body, genre: splittedGenreString}

    Videogame.create(newVideogame)
    .then((result)=>{
        console.log(result)
        res.render('newVideogame')
    })
    .catch((error)=>console.log(error))
})

//LISTENER
app.listen(process.env.PORT, ()=>{
    console.log(`in the air on port ${process.env.PORT}`)
})

