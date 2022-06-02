import { promisify } from 'node:util'
import stream from 'node:stream'
import fs from 'node:fs'
import got from 'got'
import { Info, InfoExtractor } from './common/common'

export interface Visible {
  type: number
  list_id: number
}

export interface Badge {
  bind_taobao: number
  user_name_certificate: number
  super_star_2018: number
  dailv_2018: number
  suishoupai_2019: number
  hongrenjie_2019: number
  family_2019: number
  hongbao_2020: number
  hongbaofeifuniu_2021: number
  hongbaofeijika_2021: number
}

export interface User {
  id: number
  screen_name: string
  profile_image_url: string
  profile_url: string
  statuses_count: number
  verified: boolean
  verified_type: number
  verified_type_ext: number
  verified_reason: string
  close_blue_v: boolean
  description: string
  gender: string
  mbtype: number
  urank: number
  mbrank: number
  follow_me: boolean
  following: boolean
  follow_count: number
  followers_count: string
  followers_count_str: string
  cover_image_phone: string
  avatar_hd: string
  like: boolean
  like_me: boolean
  badge: Badge
}

export interface NumberDisplayStrategy {
  apply_scenario_flag: number
  display_text_min_number: number
  display_text: string
}

export interface CommentManageInfo {
  comment_permission_type: number
  approval_comment_type: number
  comment_sort_type: number
}

export interface PagePic {
  width: number
  url: string
  height: number
}

export interface MediaInfo {
  stream_url: string
  stream_url_hd: string
  duration: number
}

export interface Urls {
  mp4_720p_mp4: string
  mp4_720p: string
  mp4_ld_mp4: string
  mp4_hd_mp4: string
  mp4_ld: string
  mp4_hd: string
}

export interface VideoDetails {
  size: number
  bitrate: number
  label: string
  prefetch_size: number
}

export interface PageInfo {
  type: string
  object_type: number
  url_ori: string
  page_pic: PagePic
  page_url: string
  object_id: string
  page_title: string
  title: string
  content1: string
  content2: string
  video_orientation: string
  play_count: string
  media_info: MediaInfo
  urls: Urls
  video_details: VideoDetails
}

export interface Params {
  uid: number
}

export interface Button {
  type: string
  name: string
  sub_type: number
  params: Params
}

export interface Data {
  visible: Visible
  created_at: string
  id: string
  mid: string
  can_edit: boolean
  show_additional_indication: number
  text: string
  textLength: number
  source: string
  favorited: boolean
  pic_ids: any[]
  is_paid: boolean
  mblog_vip_type: number
  user: User
  reposts_count: number
  comments_count: number
  reprint_cmt_count: number
  attitudes_count: number
  pending_approval_count: number
  isLongText: boolean
  mlevel: number
  darwin_tags: any[]
  mblogtype: number
  number_display_strategy: NumberDisplayStrategy
  content_auth: number
  comment_manage_info: CommentManageInfo
  pic_num: number
  fid: number
  new_comment_style: number
  page_info: PageInfo
  bid: string
  buttons: Button[]
  status_title: string
  ok: number
}

export interface WeiboJsonData {
  ok: number
  data: Data
}

const WEIBO_FETCH_URL = 'https://m.weibo.cn/statuses/show?id='

class WeiboIE extends InfoExtractor {
  _VALID_URL = /https?:\/\/(www\.)?weibo\.com\/[0-9]+\/(?<id>[a-zA-Z0-9]+)/

  async extractInfo(url: string) {
    const info = new Info(url, this._VALID_URL)
    const jsonUrl = `${WEIBO_FETCH_URL}${info.id}`
    const res = await got(jsonUrl, {
      method: 'GET',
    }).json<WeiboJsonData>()
    fs.writeFileSync('weibo.json', JSON.stringify(res, null, 2))
    if (res.ok) {
      info.title = res.data.status_title
      info.thumbnail = res.data.page_info.page_pic.url
      info.url = res.data.page_info.media_info.stream_url
      info.ext = 'mp4'
      return info
    }
    else {
      return info
    }
  }

  async extractDownload(info: Info) {
    const pipeline = promisify(stream.pipeline)
    await pipeline(
      got.stream(info.url),
      fs.createWriteStream(`${info.id}.${info.ext}`),
    )
  }
}

export default WeiboIE
