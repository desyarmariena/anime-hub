import Image from 'next/image'
import styles from './page.module.css'
import {Anime} from '@/types/anime'

type AnimeResponse = {
  data: Anime[]
}

export default async function Home() {
  const {data}: AnimeResponse = await fetch(
    'https://api.jikan.moe/v4/anime?limit=24',
  ).then(data => data.json())

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>TV Series/Anime</h1>
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
