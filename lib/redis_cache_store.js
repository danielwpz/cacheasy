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

    if (options.ttl) {
      this._redis.set(key, value, 'ex', options.ttl)
    } else {
      this._redis.set(key, value)
    }
    debug(`cached [${key}]`)
  }

  async get (key) {
    debug(`getting [${key}]`)
    return this._redis.get(key)
  }
}

module.exports = RedisCacheStore
