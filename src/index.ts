import fg from 'fast-glob'
import type { InfoExtractor } from './extractor/common/common'

const globs = 'src/extractor/*.ts'

export default async function (url: string) {
  const assets = await fg(
    globs, {
      onlyFiles: true,
      unique: true,
    },
  )
  for await (const iterator of assets) {
    const Extractor = (await import(iterator)).default
    const infoExtractor: InfoExtractor = new Extractor()
    // eslint-disable-next-line no-console
    console.log(infoExtractor._VALID_URL)
    if (infoExtractor.suitable(url))
      // eslint-disable-next-line no-console
      console.log(true)
  }
}
