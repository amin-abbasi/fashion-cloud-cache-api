/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import * as CacheModel from '../models/cache'

const exportResult = {

  // Create Cache
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CacheModel.Cache = req.body
      const result: CacheModel.Cache = await CacheModel.add(data)

      res.result = (result as any)._doc
      next(res)
    } catch (err) { next(err) }
  },

  // List all Cache
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: CacheModel.IQueryData = req.query as CacheModel.IQueryData
      const result = await CacheModel.list(query)
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

  // Update Cache
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sampleId: string = req.params.sampleId
      const result = await CacheModel.updateById(sampleId, req.body)
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