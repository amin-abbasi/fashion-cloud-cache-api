import uniqueV  from 'mongoose-unique-validator'
import mongoose from 'mongoose'
import Boom     from '@hapi/boom'
import config   from '../configs/config'

const Schema = mongoose.Schema

// Typescript Cache Model
export interface Cache extends mongoose.Document {
  key : string
  ttl : number
  randomString : string

  createdAt? : number
  updatedAt? : number
  deletedAt? : number
}

export interface CacheUpdate extends mongoose.Document {
  key  : Cache['key']
  ttl? : Cache['ttl']
  randomString? : Cache['randomString']
  updatedAt?    : Cache['updatedAt']
}

// Add your own attributes in schema
const schema = new Schema({
  key: { type: Schema.Types.String, required: true, unique: true },
  ttl: { type: Schema.Types.Number, required: true },
  randomString: { type: Schema.Types.String, required: true },

  createdAt: { type: Schema.Types.Number },
  updatedAt: { type: Schema.Types.Number },
  deletedAt: { type: Schema.Types.Number, default: 0 },
})

// Apply the Unique Property Validator plugin to schema.
schema.plugin(uniqueV, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.'
})

// Choose your own model name
const Cache = mongoose.model<Cache>('Cache', schema)

export async function createOrUpdate(key: string, randomString: string): Promise <Cache> {
  const now: number = new Date().getTime()
  try {
    // Will update the existing cache with given `key`
    const cache: Cache = await details(key)
    cache.randomString = randomString
    cache.ttl = now + config.ttl
    cache.updatedAt = now
    return await Cache.findByIdAndUpdate(cache._id, cache, { new: true }) as Cache
  } catch (error) {
    // Creates a new cache
    const cacheData = {
      key,
      randomString,
      ttl: now + config.ttl,
      createdAt: now,
    }
    return await Cache.create(cacheData as Cache)
  }
}

export interface IQueryData {
  page: number
  size: number
  deletedAt: number       // Always filter deleted documents
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any      // needs to specified later based on entity or model
}

export async function list(queryData: IQueryData): Promise<{ total: number, list: Cache[] }> {
  const { page, size, ...query } = queryData

  // if(query.dateRange) {
  //   query.createdAt = {}
  //   if(query.dateRange.from) query.createdAt['$gte'] = query.dateRange.from
  //   if(query.dateRange.to)   query.createdAt['$lte'] = query.dateRange.to
  //   delete query.dateRange
  // }
  // if(query.randomString) query.randomString = { '$regex': query.randomString, '$options': 'i' }

  const total: number = await Cache.countDocuments({ deletedAt: 0 })
  const result: Cache[] = await Cache.find(query).limit(size).skip((page - 1) * size)
  return {
    total: total,
    list: result
  }
}

export async function details(key: string): Promise<Cache> {
  const caches: Cache[] = await Cache.find({ key })
  if(caches.length === 0) throw Boom.notFound('Cache not found.')
  const cache: Cache = caches[0]
  if(!cache || cache.deletedAt !== 0) throw Boom.notFound('Cache not found.')
  return cache
}

export async function softDelete(key: string): Promise<Cache | null> {
  const cache: Cache = await details(key)
  return await Cache.findByIdAndUpdate(cache.id, { deletedAt: new Date().getTime() }, { new: true })
}

export async function remove(key: string): Promise<{ ok?: number, n?: number } & { deletedCount?: number }> {
  const cache: Cache = await details(key)
  return await Cache.deleteOne({ _id: cache.id })
}

// --------------- Swagger Models Definition ---------------

/**
 * @swagger
 *  components:
 *    schemas:
 *      Cache:
 *        type: object
 *        required:
 *          - key
 *          - ttl
 *          - randomString
 *        properties:
 *          key:
 *            type: string
 *          ttl:
 *            type: integer
 *          randomString:
 *            type: string
 *        example:
 *          key: 'zzz'
 *          ttl: 12345678
 *          randomString: 'xxx123'
 */