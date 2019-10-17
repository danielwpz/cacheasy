const CacheStore = require('./cache_store')
const Redis = require('ioredis')
const debug = require('debug')('cacheasy:redis')

class RedisCacheStore extends CacheStore {
  constructor (redisOptions) {
    super()
    this._redis = new Redis(redisOptions)
  }

  async set (key, generator, options) {
    options = options || {}
    const value = await this.runGenerator(generator)
    const encoded = JSON.stringify(value)

    if (options.ttl) {
      this._redis.set(key, encoded, 'ex', options.ttl)
    } else {
      this._redis.set(key, encoded)
    }
    debug(`cached [${key}]`)
  }

  async get (key) {
    debug(`getting [${key}]`)
    const encoded = await this._redis.get(key)
    if (!encoded) {
      return
    }
    return JSON.parse(encoded)
  }
}

module.exports = RedisCacheStore
