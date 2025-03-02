export const runtime = 'edge'

import Image from 'next/image'
import styles from './page.module.css'
import {Anime} from '@/types/anime'
import Input from './input.client'
import Pagination from './pagination.client'
import Link from 'next/link'

type AnimeResponse = {
  data: Anime[]
  pagination: {
    last_visible_page: number
    has_next_page: boolean
    current_page: number
    items: {
      count: number
      total: number
      per_page: number
    }
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{search: string; page: string}>
}) {
  const keyword = (await searchParams).search
  const page = (await searchParams).page
  const params = new URLSearchParams({limit: '24'})
  if (keyword) params.set('q', String(keyword))
  if (page) params.set('page', page)

  const {data, pagination}: AnimeResponse = await fetch(
    `https://api.jikan.moe/v4/anime?${params.toString()}`,
  ).then(data => data.json())

  return (
    <main>
      <h1 className={styles.heading}>TV Series/Anime</h1>
      <div className={styles.filter}>
        <Input />
        <Pagination
          currentPage={pagination.current_page}
          hasNextPage={pagination.has_next_page}
        />
      </div>
      <div className={styles.page}>
        {data.map(anime => (
          <Link
            href={`/${anime.mal_id}`}
            key={anime.mal_id}
            className={styles.anime}
          >
            <h3 className={styles.anime__title}>{anime.title}</h3>
            <div className={styles.anime__image}>
              <Image src={anime.images.webp.image_url} alt={anime.title} fill />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
