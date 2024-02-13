import app from './app.js'
import request from 'supertest'

describe("App Test", () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200) // Check status for 200
        expect(res.header['content-type']).toContain('json') // Checks for content type
        expect(res.body.info).toBeDefined() // Make sure the key exists
        expect(res.body.info).toBe('Journal API') // Make sure it contains the text expected
    })

    

    describe('POST /entries', () => {
        let cats, res
    
        beforeAll(async () => {
          cats = await request(app).get('/categories')
          res = await request(app).post('/entries').send({
            category: cats.body[0]._id,
            content: 'Jest test content'
          })
        })

        test('Returns JSON with 201 status', () => {
            expect(res.status).toBe(201)
            expect(res.header['content-type']).toContain('json')
        })
      
        test('Body has _id, category and content fields', () => {
            expect(res.body._id).toBeDefined()
            expect(res.body.category).toBeDefined()
            expect(res.body.content).toBeDefined()
        })

        test('Category is an object with _id and name fields', () => {
            expect(res.body.category).toBeInstanceOf(Object)
            expect(res.body.category._id).toBeDefined()
            expect(res.body.category.name).toBeDefined()
          })
      
          test('Correct category and content are returned', () => {
            expect(res.body.category._id).toBe(cats.body[0]._id)
            expect(res.body.content).toBe('Jest test content')
          })
      
          afterAll(() => {
            // Cleanup
            request(app).delete(`/entries/${res.body._id}`)
          })
    })

    describe('GET /categories', () => {
        let res
    
        beforeAll(async () => {
          res = await request(app).get('/categories')
        })
        
        test('Returns JSON content', () => {
            expect(res.status).toBe(200)
            expect(res.header['content-type']).toContain('json')
          })
          test('Returns an array', () => {
            expect(res.body).toBeInstanceOf(Array)
          })
          test('Array has 4 elements', () => {
            expect(res.body).toHaveLength(4)
          })
          test('One element is an object with key "name" == "Food"', () => {
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Food" })]))
          })
        })
      })