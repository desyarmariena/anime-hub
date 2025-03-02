'use client'
import React from 'react'
import Link from 'next/link'
import {ChevronLeft} from 'lucide-react'
import styles from './page.module.css'
import {useRouter} from 'next/navigation'

export default function Navigate() {
  const router = useRouter()
  return (
    <div role="button" className={styles.back} onClick={() => router.back()}>
      <ChevronLeft /> Back to Anime List
    </div>
  )
}
