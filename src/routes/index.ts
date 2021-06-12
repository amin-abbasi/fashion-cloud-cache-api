import { errors } from 'celebrate'
import { Request, Response, Router } from 'express'
const router: Router = Router()

// ------ Add JWT to chosen routes
// import jwt    from 'express-jwt'
// import config from '../configs/config'
// const JwtCheck = jwt({ secret: config.jwt.key })
// router.use('/v1/caches', JwtCheck, cacheRouter)

// Cache APIs
import cacheRouter from './cache'
router.use('/v1/caches', cacheRouter)

// API Documentation Swagger
import swaggerUi  from 'swagger-ui-express'
import * as specs from '../services/swagger'
router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(specs, { explorer: true }))

// Health-check Endpoint
router.get('/health', (_req: Request, res: Response) => { res.send('200') })

router.use(errors())

export default router