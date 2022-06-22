import { Info, InfoExtractor } from './common/common'

class BilibiliIE extends InfoExtractor {
  _VALID_URL = /https?:\/\/(www\.)?bilibili\.com\/(?<id>[a-zA-Z0-9]+)/

  async extractInfo(url: string): Promise<Info> {
    const info = new Info(url, this._VALID_URL)
    return info
  }
}

export default BilibiliIE
