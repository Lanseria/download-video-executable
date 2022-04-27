import { promisify } from 'node:util'
import stream from 'node:stream'
import fs from 'node:fs'
import got from 'got'

const pipeline = promisify(stream.pipeline)

const download = async () => {
  const res = await got('https://m.weibo.cn/statuses/show?id=LrCXe2Fm4', {
    method: 'GET',
  }).json<any>()
  if (res.ok) {
    const { data } = res
    const { page_info } = data
    if (page_info.type === 'video') {
      const { stream_url } = page_info.media_info
      await pipeline(
        got.stream(stream_url),
        fs.createWriteStream('index.mp4'),
      )
      console.log('下载成功')
    }
  }
  return res
}

export { download }
