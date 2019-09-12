const CacheStore = require('./cache_store')
const NodeCache = require('node-cache')
const debug = require('debug')('cacheasy:memory')

class MemoryCacheStore extends CacheStore {
  constructor () {
    super()
    this._node_cache = new NodeCache()
  }

  async set (key, generator, options) {
    options = options || {}
    const value = await this.runGenerator(generator)
    this._node_cache.set(key, value, options.ttl)
    debug(`cached [${key}]`)
  }

  async get (key) {
    debug(`getting [${key}]`)
    return this._node_cache.get(key)
  }
}

module.exports = MemoryCacheStore
