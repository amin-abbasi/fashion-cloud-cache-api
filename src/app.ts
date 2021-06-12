// ------ Import npm modules
import express from 'express'
import helmet  from 'helmet'
import { urlencoded, json } from 'body-parser'

const app: express.Application = express()

// ------ Initialize & Use Middle-Wares
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(helmet())

// ------ Add logger to system
import logger from './services/logger'
app.use(logger)

// ------ Require all routes
import router from './routes'
app.use('/api', router)

// ------ Add Response Decorator (& error handler) to system
import decorator from './services/response_decorator'
app.use(decorator)

export default app