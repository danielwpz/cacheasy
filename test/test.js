const Cacheasy = require('../index')
const { MemoryCacheStore } = Cacheasy.store
const assert = require('assert')

const cache = new Cacheasy(new MemoryCacheStore())

async function test () {
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
