import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts"

export async function GET(context) {
  const posts = await getCollection("travel")
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter(post => !post.data.hidden)
      .map(post => ({
        title: post.data.title,
        subtitle: post.data.subtitle,
        pubDate: post.data.pubDate,
        link: `/travel/${post.slug}/`,
      }))
      .sort((a, b) => b.pubDate - a.pubDate),
  })
}
