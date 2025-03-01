import Image from 'next/image'
import styles from './page.module.css'
import {Anime} from '@/types/anime'
import Input from './input.client'

type AnimeResponse = {
  data: Anime[]
}

export default async function Home({searchParams}: {searchParams: string}) {
  const keyword = (await searchParams).search
  const params = new URLSearchParams({limit: '24'})
  if (keyword) {
    params.set('q', String(keyword))
  }
  const {data}: AnimeResponse = await fetch(
    `https://api.jikan.moe/v4/anime?${params.toString()}`,
  ).then(data => data.json())

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>TV Series/Anime</h1>
      <Input />
      <div className={styles.page}>
        {data.map(anime => (
          <div key={anime.mal_id} className={styles.anime}>
            <h3 className={styles.anime__title}>{anime.title}</h3>
            <div className={styles.anime__image}>
              <Image src={anime.images.webp.image_url} alt={anime.title} fill />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
