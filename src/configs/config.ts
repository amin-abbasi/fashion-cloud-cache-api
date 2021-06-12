import dotenv from 'dotenv'
import { IConfigModel } from '../../types/config'
dotenv.config()

const env = JSON.parse(JSON.stringify(process.env))

// All Configs that needed to be centralized
const config: IConfigModel = {

  // dotenv App Environment Variables
  env: env,

  // Base URL
  baseURL: `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}`,

  // Regex
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/
  },

  // Time To Live (TTL) [milliseconds]
  ttl: 2 * 60 * 1000,    // 2 minutes

}

export default config