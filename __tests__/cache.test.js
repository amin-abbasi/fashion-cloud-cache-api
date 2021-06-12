const supertest = require('supertest')
const config    = require('../src/configs/config')
const server    = require('../src/app')

jest.setTimeout(60000)
// jest.mock('../__mocks__/caches.js')

const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT } = config.default.env
const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api`

// ---------------------------------- MongoDB ----------------------------------------
const mongoose = require('mongoose')
const mongoDB = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/testDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  },
  disconnect: (done) => { mongoose.disconnect(done) },
}

// const request = supertest(url)
const request = supertest(server)

const body_sample = { key: 'xyz' }

describe('Cache Worker', () => {

  beforeAll(() => { mongoDB.connect() })
  afterAll((done) => { mongoDB.disconnect(done) })

  // Create Caches
  test('should create a cache', async (done) => {
    const res = await request.post('/v1/caches').send(body_sample)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
    done()
  })

  // List of Caches
  test('should get list of caches keys', async (done) => {
    const res = await request.get('/v1/caches')
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
    done()
  })

  // Cache Details
  test('should get cache details', async (done) => {
    const res = await request.get('/v1/caches/' + body_sample.key)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
    done()
  })

  // Delete a Cache
  test('should delete a cache', async (done) => {
    const res = await request.del('/v1/caches/' + body_sample.key)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
    done()
  })

  // Delete all Caches from DB
  test('should delete all caches from DB', async (done) => {
    const res = await request.del('/v1/caches')
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
    done()
  })

})
