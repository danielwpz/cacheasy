const debug = require('debug')('cacheasy')

class CacheStore {
  constructor (store) {
    this._store = store
  }

  async runGenerator (generator) {
    if (typeof generator === 'function') {
      return generator()
    }

    return generator
  }

  /**
   * Get the cached value for key, if missed, return generator
   * @param {string} key cache key
   * @param {function} generator A function or object, to be cached
   * @param {object} options
   * @param {number} options.ttl Cache TTL
   * @param {function} options.fallbackGenerator When generator throws, return this instead
   */
  async cache (key, generator, options) {
    const cached = await this.get(key)
    if (cached) {
      debug(`cache HIT [${key}]`)
      return cached
    }

    debug(`cache MISS [${key}]`)

    let value
    try {
      value = await this.runGenerator(generator)
      await this.set(key, value, options)
    } catch (err) {
      if (!options.fallbackGenerator) {
        throw err
      }
      value = await this.runGenerator(options.fallbackGenerator)
    }
    return value
  }

  async set (key, generator, options) {
    return this._store.set(key, generator, options)
  }

  async get (key) {
    return this._store.get(key)
  }

  async delete (key) {
    return this.set(key, null)
  }
}

module.exports = CacheStore
