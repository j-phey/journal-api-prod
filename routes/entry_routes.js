import { EntryModel } from "../db.js"
import { Router } from "express"

const router = Router()

// GET /entries
router.get('/', async (req, res) => res.send(await EntryModel.find().populate('category'))) // .populate('category') embeds the entire category doc in the GET request

// GET a single entry from 
router.get('/:id', async (req, res) =>  {
    // const entry = await EntryModel.findOne({ _id: req.params.id }) // findOne returns a single entry, find() returns an array
    const entry = await EntryModel.findById(req.params.id).populate('category') 
    console.log(entry)
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Entry not found' })
    }
})

// POST 
router.post('/', async (req, res) => {
    try {
        const insertedEntry = await (await EntryModel.create(req.body)).populate('category')
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// PUT /id
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if (updatedEntry) {
            res.send(updatedEntry) // 200 default status
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// DELETE /entries/id
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id)
        if (deletedEntry) {
            res.sendStatus(204)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router