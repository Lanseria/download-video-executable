import { describe, expect, it } from 'vitest'
import { download } from '../src/index'
// Edit an assertion and save to see HMR in action

const BILIBILI_URL = 'https://www.bilibili.com/video/BV1nY4y1a7pG'
const WEIBO_URL = 'https://weibo.com/6275294458/Fp6RGfbff?type=comment'

describe('download', () => {
  it('download', async () => {
    const r = await download()
  })
})
