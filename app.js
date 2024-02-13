import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

// const categories = ['Food', 'Gaming', 'Coding', 'Other']

const app = express()

app.use(cors()) // Needed to link API to FE
app.use(express.json())

// GET / (home/index)
// app.get('/', () => console.log('Home')) // When a GET request comes for the home route (/), it will console.log 'Home'
// app.get('/', (req, res) => res.send('<h2>Home</h2>')) // Prints 'Home' in the GET request. Can mark it up with HTML like <h2>
app.get('/', (req, res) => res.send({ info: 'Journal API'})) 

// TODO: Move /categories to routes folder
// TODO: Complete categories CRUD
// (optional) TODO ADVANCED: Modify GET /categories/:id to embed an array of all the entries in that category

// GET /categories
app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.use('/entries',entryRoutes) // .use is for middleware

// app.listen(4003) 

export default app