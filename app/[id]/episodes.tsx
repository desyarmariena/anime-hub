import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import {Episode} from '@/types/anime'

type EpisodeResponse = {
  data: {
    episodes: Episode[]
  }
}

export default async function Episodes({id}: {id: string}) {
  const {data: videos}: EpisodeResponse = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/videos`,
  ).then(data => data.json())

  if (!videos || !videos.episodes.length) return null
  return (
    <section>
      <h2>Latest Episode</h2>
      <div className={styles.episodes}>
        {videos.episodes.map(anime => (
          <div key={anime.mal_id} className={styles.anime}>
            <p className={styles.anime__title}>{anime.title}</p>
            <h3>{anime.episode}</h3>
            {anime.images.jpg.image_url ? (
              <div className={styles.anime__image}>
                <Image
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  fill
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
