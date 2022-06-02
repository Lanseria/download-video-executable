import { describe, it } from 'vitest'
import fg from 'fast-glob'
import main from '../src/index'
import type { TestDataType } from './extractor/data'

const globs = 'test/extractor/*.test.ts'

describe('index test', () => {
  it('suitable', async () => {
    const assets = await fg(
      globs, {
        onlyFiles: true,
        unique: true,
      },
    )
    const ALL_TEST_DATA_LIST: TestDataType[] = []
    for await (const iterator of assets) {
      const testData = (await import(iterator))._TEST
      ALL_TEST_DATA_LIST.push(testData)
    }
    for await (const item of ALL_TEST_DATA_LIST)
      await main(item.url)
  })
})
