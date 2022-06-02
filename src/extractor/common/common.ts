const utils_match_id = (url: string, matchUrl: RegExp) => {
  const r = url.match(matchUrl)
  if (r)
  // 正则定义 ?<id>
    return r.groups!.id
  else
    throw new Error('invalid url')
}
/**
 * Information Extractor class.
 *  信息提取器是在给定 URL 的情况下提取的类
    URL 引用的视频（或视频）的相关信息。 这
    信息包括真实视频URL、视频标题、作者和
    其他。 信息存储在字典中，然后
    传递给 YoutubeDL。 YoutubeDL 处理这个
    可能将视频下载到文件系统的信息，其中
    其他可能的结果。
 */
class InfoExtractor {
  isReady = false
  _VALID_URL = /\d+/
  constructor() {
    this.isReady = false
  }

  suitable(url: string) {
    if (this._VALID_URL === /\d+/)
      return false
    else
      return this._VALID_URL.test(url)
  }

  _match_id(url: string) {
    return utils_match_id(url, this._VALID_URL)
  }

  async extractInfo(url: string) {
    const info = new Info(url, this._VALID_URL)
    return info
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async extractDownload(info: Info) {
    //
  }
}

class Info {
  id = ''
  title = ''
  url = ''
  ext = ''
  thumbnail = ''
  thumbnails: string[] = []
  webpage_url = ''
  constructor(url: string, matchUrl: RegExp) {
    this.webpage_url = url
    this.id = utils_match_id(url, matchUrl)
  }
}

export { InfoExtractor, Info }
