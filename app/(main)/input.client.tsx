'use client'

import React, {useCallback} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import styles from './page.module.css'

export default function Input() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.delete('page')
      if (value === '') {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  return (
    <input
      type="search"
      placeholder="Search anime"
      defaultValue={searchParams.get('search') ?? ''}
      onKeyDown={e => {
        const keyword = (e.target as HTMLInputElement).value
        if (e.key === 'Enter') {
          router.push(pathname + '?' + createQueryString('search', keyword))
        }
      }}
      className={styles.filter__search}
    />
  )
}
