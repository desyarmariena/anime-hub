export type Anime = {
  mal_id: number
  title: string
  title_japanese: string
  background: string
  synopsis: string
  images: {
    webp: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
  }
  duration: string
  status: string
  rating: string
  genres: AnimeGenre[]
}

export type AnimeGenre = {
  mal_id: number
  name: string
  type: string
  url: string
}

export type Episode = {
  mal_id: number
  title: string
  episode: string
  url: string
  images: {
    jpg: {
      image_url: string
    }
  }
}
