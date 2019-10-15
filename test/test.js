const Cacheasy = require('../index')
const { MemoryCacheStore, RedisCacheStore } = Cacheasy.store
const assert = require('assert')

const memoryStore = new MemoryCacheStore()
const redisStore = new RedisCacheStore()
const cache = new Cacheasy(redisStore)

async function test () {
  console.log('running test')
  return cache.cache('foo', async () => 'bar')
}

async function fail () {
  return cache.cache('boom', () => {
    throw new Error('something happened')
  })
}

test()
  .then(test)
  .then(value => assert(value === 'bar'))
  .then(fail)
  .catch(err => {
    assert(err.message === 'something happened')
  })
  .then(() => {
    console.log('ok')
  })
