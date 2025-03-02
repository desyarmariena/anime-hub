import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Anime} from '@/types/anime'
import Episodes from './episodes'
import styles from './page.module.css'
import Navigate from './navigate.client'

export default async function AnimeDetail({params}: {params: {id: string}}) {
  const {id} = await params
  const {data}: {data: Anime} = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/full`,
  ).then(data => data.json())

  return (
    <main className={styles.container}>
      <Navigate />
      <section className={styles.detail}>
        <div className={styles.detail__image}>
          <Image src={data.images.webp.large_image_url} fill alt={data.title} />
        </div>
        <div className={styles.detail__description}>
          <h1 className={styles.detail__title}>
            {data.title} ({data.title_japanese})
          </h1>
          <p>{data.synopsis}</p>
          <p>
            <strong>Genres:</strong>{' '}
            {data.genres.map(genre => (
              <Link key={genre.mal_id} href={`/genre/${genre.name}`}>
                {genre.name}
              </Link>
            ))}
          </p>
          <p>
            <strong>Duration:</strong> {data.duration}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Rating:</strong> {data.rating}
          </p>
        </div>
      </section>
      <Episodes id={id} />
    </main>
  )
}
