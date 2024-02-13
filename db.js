import mongoose from 'mongoose' 
import dotenv from 'dotenv'

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect')
}
catch(err) {
    console.error(err)
}

const closeConnection = () => {
    console.log('Mongoose disconnecting ...')
    mongoose.disconnect()
}

// process.on('SIGTERM', () => mongoose.disconnect())

const entriesSchema = new mongoose.Schema({
        category: { type: mongoose.ObjectId, ref: 'Category' },
        content: { type: String, required: true }
}) // Ensures the sub-documents don't have ids

const EntryModel = mongoose.model('Entry', entriesSchema)

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true }
    // entries: [entriesSchema]
})

const CategoryModel = mongoose.model('Category', categoriesSchema)

export { closeConnection, EntryModel, CategoryModel }