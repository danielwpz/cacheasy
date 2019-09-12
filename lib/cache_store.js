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

  async cache (key, generator, options) {
    const cached = await this.get(key)
    if (cached) {
      debug(`cache HIT [${key}]`)
      return cached
    }

    debug(`cache MISS [${key}]`)

    const value = await this.runGenerator(generator)
    await this.set(key, value, options)
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
