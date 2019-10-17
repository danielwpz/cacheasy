const CacheStore = require('./cache_store')

class NoneCacheStore extends CacheStore {
  async set (key, generator, options) {
    return this.runGenerator(generator)
  }

  async get (key) {
    return null
  }
}

module.exports = NoneCacheStore
