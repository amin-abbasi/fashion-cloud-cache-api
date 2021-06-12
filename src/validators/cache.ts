import { celebrate, Joi } from 'celebrate'
import config from '../configs/config'

const objectId = Joi.string().regex(config.regex.objectId)

const exportResult = {

  // Create Or Update Cache
  createOrUpdate: celebrate({
    body: {
      key: Joi.string().required().description('Cache Key'),
    },
    query: {}
  }),

  // List All Caches Keys
  list: celebrate({
    query: {
      // size: Joi.number().default(10).description('Cache Pagination Size'),
      // page: Joi.number().default(1).description('Cache Pagination Page'),
    }
  }),

  // Show Cache Details
  details: celebrate({
    params: {
      sampleId: objectId.required().description('Cache ID')
    },
    query: {}
  }),

  // Delete Cache (Soft Delete)
  delete: celebrate({
    params: {
      sampleId: objectId.required().description('Cache ID')
    },
    query: {}
  }),

}

export default exportResult