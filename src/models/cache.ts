import mongoose from 'mongoose'
import Boom     from '@hapi/boom'

const Schema = mongoose.Schema

interface ILocation {
    country  : string
    city     : string
    address? : string
    coordinate?: {
      lat: number
      lon: number
    }
  }

// Typescript Cache Model
export interface Cache extends mongoose.Document {
  name: string
  email: string
  any?: unknown
  location?: ILocation

  createdAt? : number
  updatedAt? : number
  deletedAt? : number
}

export interface CacheUpdate extends mongoose.Document {
  name? : Cache['name']
  any?  : Cache['any']
  location?  : Cache['location']
  updatedAt? : Cache['updatedAt']
}

// Add your own attributes in schema
const schema = new Schema({
  name:  { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true, unique: true },
  any: Schema.Types.Mixed,    // An "anything goes" SchemaType

  // Advanced Property type schema
  location: {
    type: {
      _id: false,
      country: { type: Schema.Types.String, required: true },
      city:    { type: Schema.Types.String, required: true },
      address: { type: Schema.Types.String },
      coordinate: {
        type: {
          _id: false,
          lat: Schema.Types.Number,
          lon: Schema.Types.Number
        }
      }
    },
    required: true
  },

  createdAt: { type: Schema.Types.Number },
  updatedAt: { type: Schema.Types.Number },
  deletedAt: { type: Schema.Types.Number, default: 0 },

  // , ... other properties ...
},
{
  strict: false,  // To allow database in order to save Mixed type data in DB
  // timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

// -------------------------------- Set Hooks (like: 'pre') for Schema --------------------------------
// Pre Save
// schema.pre('save', async function(next) {
//   // ... Code Here ...
//   const user: any = this
//   if (!user.isModified('password')) next()
//   try {
//     const salt = await bcrypt.genSalt(config.saltHashFactor)
//     user.password = await bcrypt.hash(user.password, salt)
//     next()
//   } catch (err) {
//     next(err)
//   }
// })

// Flatten model to update (patch) partial data
// schema.pre('findOneAndUpdate', function() {
//   this._update = flat(this._update)
// })


// Choose your own model name
const Cache = mongoose.model<Cache>('Cache', schema)

export async function add(data: Cache): Promise <Cache> {
  const cacheData = {
    ...data,
    createdAt: new Date().getTime()
  }
  return await Cache.create(cacheData as Cache)
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
  // if(query.name) query.name = { '$regex': query.name, '$options': 'i' }

  const total: number = await Cache.countDocuments({ deletedAt: 0 })
  const result: Cache[] = await Cache.find(query).limit(size).skip((page - 1) * size)
  return {
    total: total,
    list: result
  }
}

export async function details(cacheId: string): Promise<Cache> {
  const cache: Cache | null = await Cache.findById(cacheId)
  if(!cache || cache.deletedAt !== 0) throw Boom.notFound('Cache not found.')
  return cache
}

export async function updateByQuery(query: IQueryData, data: CacheUpdate): Promise<Cache | null> {
  const updatedData = { ...data, updatedAt: new Date().getTime() }
  return await Cache.findOneAndUpdate(query, updatedData, { new: true })
}

export async function updateById(cacheId: string, data: CacheUpdate): Promise<Cache | null> {
  const cache: Cache = await details(cacheId)
  cache.updatedAt = new Date().getTime()
  const updatedCache: Cache = { ...cache, ...data } as Cache
  return await Cache.findByIdAndUpdate(cacheId, updatedCache, { new: true })
}

export async function softDelete(cacheId: string): Promise<Cache | null> {
  const cache: Cache = await details(cacheId)
  return await Cache.findByIdAndUpdate(cache.id, { deletedAt: new Date().getTime() }, { new: true })
}

export async function remove(cacheId: string): Promise<{ ok?: number, n?: number } & { deletedCount?: number }> {
  const cache: Cache = await details(cacheId)
  return await Cache.deleteOne({ _id: cache.id })
}

export async function restore(cacheId: string): Promise<Cache | null> {
  const cache: Cache = await details(cacheId)
  return await Cache.findByIdAndUpdate(cache.id, { deletedAt: 0 }, { new: true })
}

// --------------- Swagger Models Definition ---------------

/**
 * @swagger
 *  components:
 *    schemas:
 *      Cache:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *          name: 'Amin'
 *          email: 'amin@gmail.com'
 */