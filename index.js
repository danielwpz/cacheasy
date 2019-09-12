const CacheStore = require('./lib/cache_store')
const MemoryCacheStore = require('./lib/memory_cache_store')

module.exports = CacheStore
module.exports.store = {
  MemoryCacheStore
}
