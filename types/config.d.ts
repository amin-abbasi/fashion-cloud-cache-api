export interface IEnvironmentModel {
  readonly NODE_ENV : string
  readonly APP_ENV  : string
  readonly DB_HOST  : string
  readonly DB_USER? : string
  readonly DB_PASS? : string
  readonly DB_PORT  : number
  readonly DB_NAME  : string
  readonly DB_TYPE  : string
  readonly SERVER_PROTOCOL: string
  readonly SERVER_HOST : string
  readonly SERVER_PORT : number
  readonly LOGGER_HOST : string
  readonly LOGGER_PORT : number
}

export interface IRegex {
  [key: string]: RegExp
}

export interface IConfigModel {
  readonly env        : IEnvironmentModel
  readonly baseURL    : string
  readonly regex      : IRegex
  readonly ttl        : number
  readonly cacheLimit : number
}
