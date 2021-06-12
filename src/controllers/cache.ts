/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import random from 'randomstring'
import * as CacheModel from '../models/cache'

const exportResult = {

  // Create Or Update Cache
  async createOrUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const key: string = req.body.key, randomString: string = random.generate()
      const result: CacheModel.Cache = await CacheModel.createOrUpdate(key, randomString)
      res.result = result
      next(res)
    } catch (err) { next(err) }
  },

  // List all Cache
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const query: CacheModel.IQueryData = req.query as CacheModel.IQueryData
      const result: string[] = await CacheModel.listKeys()
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Show Cache Details
  async details(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sampleId: string = req.params.sampleId
      const result: CacheModel.Cache = await CacheModel.details(sampleId)
      res.result = (result as any)._doc
      next(res)
    }
    catch (err) { next(err) }
  },

  // Archive Cache (Soft Delete)
  async archive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sampleId: string = req.params.sampleId
      const result = await CacheModel.softDelete(sampleId)
      res.result = (result as any)._doc
      next(res)
    }
    catch (err) { next(err) }
  },

  // Delete Cache From DB
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sampleId: string = req.params.sampleId
      const result = await CacheModel.remove(sampleId)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

}

export default exportResult