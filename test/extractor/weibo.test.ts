import { describe, expect, it } from 'vitest'
import WeiboIE from '../../src/extractor/weibo'
import type { TestDataType } from './data'

export const _TEST: TestDataType = {
  url: 'https://weibo.com/6275294458/Fp6RGfbff?type=comment',
  info_dict: {
    id: 'Fp6RGfbff',
    title: 'You should have servants...',
    url: 'https://us.sinaimg.cn/000flOUVjx07eNkeFRu8010f01002tFX0k01.mp4?label=mp4_ld&template=v2_template_ld_720&ori=0&ps=1BThihd3VLAY5R&Expires=1651813153&ssig=sbp36dq6FH&KID=unistore,video',
    ext: 'mp4',
    thumbnail: 'https://wx3.sinaimg.cn/orj480/006QGuKKly1fk8gte6pmnj30zk0k0t9i.jpg',
    thumbnails: [],
    webpage_url: 'https://weibo.com/6275294458/Fp6RGfbff?type=comment',
  },
}

describe('weibo test', () => {
  it('suitable', async () => {
    const weiboIE = new WeiboIE()
    const r = weiboIE.suitable(_TEST.url)
    expect(r).toBeTruthy()
  })

  it('match id', async () => {
    const weiboIE = new WeiboIE()
    const id = weiboIE._match_id(_TEST.url)
    expect(id).toEqual(_TEST.info_dict.id)
  })

  it('extract info', async () => {
    const weiboIE = new WeiboIE()
    const info = await weiboIE.extractInfo(_TEST.url)
    expect(info.thumbnail).toEqual(_TEST.info_dict.thumbnail)
    expect(info.title).toEqual(_TEST.info_dict.title)
  })

  it('extract download', async () => {
    const weiboIE = new WeiboIE()
    const info = await weiboIE.extractInfo(_TEST.url)
    await weiboIE.extractDownload(info)
  })
})
