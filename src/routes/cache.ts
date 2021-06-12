import express from 'express'
const router = express.Router()

// Add Controllers & Validators
import Controller from '../controllers/cache'
import Validator  from '../validators/cache'

// (action)             (verb)    (URI)
// create:              POST      - /caches
// list:                GET       - /caches
// details:             GET       - /caches/:cacheId
// update:              PUT       - /caches/:cacheId
// delete:              DELETE    - /caches/:cacheId
// do something else:   POST      - /caches/:cacheId/someOtherActionType

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
 *      summary: Create a new cache
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
router.route('').post(Validator.create, Controller.create)

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
 *  /caches/{cacheId}:
 *    get:
 *      summary: Cache Details
 *      tags: [Caches]
 *      parameters:
 *        - name: cacheId
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
router.route('/:cacheId').get(Validator.details, Controller.details)

/**
 * @swagger
 * path:
 *  /caches/{cacheId}:
 *    put:
 *      summary: Cache Update
 *      tags: [Caches]
 *      parameters:
 *        - name: cacheId
 *          in: path
 *          description: Cache ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Admin can update a cache
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
router.route('/:cacheId').put(Validator.update, Controller.update)
// router.route('/:cacheId').patch(Validator.update, Controller.update)

/**
 * @swagger
 * path:
 *  /caches/{cacheId}:
 *    delete:
 *      summary: Delete Cache
 *      tags: [Caches]
 *      parameters:
 *        - name: cacheId
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
router.route('/:cacheId').delete(Validator.delete, Controller.delete)

export default router
