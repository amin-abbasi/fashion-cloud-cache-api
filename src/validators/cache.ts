import { celebrate, Joi } from 'celebrate'
import config from '../configs/config'

const objectId = Joi.string().regex(config.regex.objectId)

const exportResult = {

  // Create new Cache
  create: celebrate({
    // body: {
    //   name: Joi.string().required().description('User Name'),
    //   userId: objectId.required().description('User ID')
    // },
    query: {}
  }),

  // List All Caches
  list: celebrate({
    query: {
      size: Joi.number().default(10).description('Cache Pagination Size'),
      page: Joi.number().default(1).description('Cache Pagination Page'),
      // name: Joi.string().max(50).description('Cache Name'),
      // userId: Joi.string().max(50).description('User ID'),
      // dateRange: Joi.object({
      //   from: Joi.date().description('Date Range From'),
      //   to:   Joi.date().description('Date Range To'),
      // }).or('from', 'to').description('Date Range'),
    }
  }),

  // Show Cache Details
  details: celebrate({
    params: {
      sampleId: objectId.required().description('Cache ID')
    },
    query: {}
  }),

  // Update Cache
  update: celebrate({
    // body: {
    //   name: Joi.string().description('User Name'),
    //   userId: objectId.required().description('User ID')
    // },
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

  // Secure Action
  secureAction: celebrate({
    params: {
      sampleId: objectId.required().description('Cache ID')
    },
    query: {}
  }),

}

export default exportResult