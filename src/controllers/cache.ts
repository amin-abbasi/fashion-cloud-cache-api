/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import * as CacheModel from '../models/cache'

const exportResult = {

  // Create Or Update Cache
  async createOrUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const key: string = req.body.key
      const result: CacheModel.Cache = await CacheModel.createOrUpdate(key)
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
      const key: string = req.params.key
      const result: CacheModel.Cache = await CacheModel.getOrUpdate(key)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Delete Cache From DB
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const key: string = req.params.key
      const result = await CacheModel.remove(key)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Delete All Caches From DB
  async deleteAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CacheModel.removeAll()
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

}

export default exportResult