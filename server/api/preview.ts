import { defineEventHandler, getQuery } from 'h3'
import got from 'got'
import metascraper from 'metascraper'
import metascraperTitle from 'metascraper-title'
import metascraperDescription from 'metascraper-description'
import metascraperImage from 'metascraper-image'

const scraper = metascraper([
  metascraperTitle(),
  metascraperDescription(),
  metascraperImage(),
])

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)

  if (!url || typeof url !== 'string') {
    return {
      success: 0,
      error: 'Missing or invalid URL!',
    }
  }

  try {
    const { body: html, url: responseUrl } = await got(url)
    const metadata = await scraper({ html, url: responseUrl })

    return {
      success: 1,
      meta: {
        title: metadata.title || '',
        description: metadata.description || '',
        image: {
          url: metadata.image || '',
        },
      },
    }
  }
  catch (e) {
    console.log(e)
    return {
      success: 0,
      error: 'Could not fetch metadata!',
    }
  }
})
