import { celebrate, Joi } from 'celebrate'

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
      key: Joi.string().required().description('Cache Key')
    },
    query: {}
  }),

  // Delete Cache (Soft Delete)
  delete: celebrate({
    params: {
      key: Joi.string().required().description('Cache Key')
    },
    query: {}
  }),

}

export default exportResult