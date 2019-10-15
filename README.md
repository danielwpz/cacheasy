# Cacheasy
Multi-backend cache library for nodejs

## API
1. CacheStore       
    - new CacheStore(store)
      Create a new cache store with given backend.

    - CacheStore.cache(key, generator, options)     
      Get the cached value for key. If cache missed, generator will be run and the returned value will be cached.      
      generator could either be a `async function` which returns a value, or a value it self.      
      options.ttl: TTL

    - CacheStore.set(key, generator, options)      
      Simple set the key with generator.
      options.ttl: TTL

    - CacheStore.get(key)      
      Get cached value for key.

2. MemoryCacheStore
    - new MemoryCacheStore()      
      Create new memory based cache store.

3. RedisCacheStore      
    - new RedisCacheStore(redisOptions)     
      Create new redis based cache store.
      options: [ioredis](https://github.com/luin/ioredis/blob/master/API.md) options

## Example
```javascript
const Cacheasy = require('../index')
const { RedisCacheStore } = Cacheasy.store
const assert = require('assert')

const redisStore = new RedisCacheStore()
const cache = new Cacheasy(redisStore)

async function test () {
  return cache.cache('foo', async () => 'bar')
}

async function fail () {
  return cache.cache('boom', () => {
    throw new Error('something happened')
  })
}

test()
  .then(test)  // cache hit for this time
  .then(value => assert(value === 'bar'))
  .then(fail)  // exceptions will not be cached
  .catch(err => {
    assert(err.message === 'something happened')
  })
```
