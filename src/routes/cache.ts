import express from 'express'
const router = express.Router()

// Add Controllers & Validators
import Controller from '../controllers/cache'
import Validator  from '../validators/cache'

// (action)             (verb)    (URI)
// create or update:    POST      - /caches
// list all keys:       GET       - /caches
// details:             GET       - /caches/:key
// delete:              DELETE    - /caches/:key
// delete all caches:   DELETE    - /caches

// ---------------------------------- Define All Cache Routes Here ----------------------------------

/**
 * @swagger
 * tags:
 *   name: Caches
 *   description: Cache management
 */

/**
 * @swagger
 * path:
 *  /caches/:
 *    post:
 *      summary: Create a new cache OR Update existing one
 *      tags: [Caches]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cache'
 *      responses:
 *        "200":
 *          description: A cache schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Cache'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('').post(Validator.createOrUpdate, Controller.createOrUpdate)

/**
 * @swagger
 * path:
 *  /caches/:
 *    get:
 *      summary: Get list of all Caches
 *      tags: [Caches]
 *      responses:
 *        "200":
 *          description: Gets a list of caches as an array of objects
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        total:
 *                          type: integer
 *                        list:
 *                          $ref: '#/components/schemas/Cache'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('').get(Validator.list, Controller.list)

/**
 * @swagger
 * path:
 *  /caches/{key}:
 *    get:
 *      summary: Cache Details
 *      tags: [Caches]
 *      parameters:
 *        - name: key
 *          in: path
 *          description: Cache ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Gets a cache's details
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Cache'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('/:key').get(Validator.details, Controller.details)

/**
 * @swagger
 * path:
 *  /caches/{key}:
 *    delete:
 *      summary: Delete Cache
 *      tags: [Caches]
 *      parameters:
 *        - name: key
 *          in: path
 *          description: Cache ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Admin can delete a cache [soft delete]
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Cache'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('/:key').delete(Validator.delete, Controller.delete)

/**
 * @swagger
 * path:
 *  /caches/:
 *    delete:
 *      summary: Delete All Caches
 *      tags: [Caches]
 *      responses:
 *        "200":
 *          description: User can delete all caches [hard delete]
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Cache'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('').delete(Validator.deleteAll, Controller.deleteAll)

export default router
