'use client'

import React from 'react'
import styles from './page.module.css'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {createQueryString} from '@/utils/query'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

type PaginationProps = {
  currentPage: number
  hasNextPage: boolean
}
export default function Pagination({
  currentPage,
  hasNextPage,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (!hasNextPage) return null
  return (
    <div className={styles.filter__pagination}>
      {currentPage !== 1 && (
        <button
          type="button"
          onClick={() => {
            router.push(
              pathname +
                '?' +
                createQueryString(
                  searchParams.toString(),
                  'page',
                  String(currentPage - 1),
                ),
            )
          }}
        >
          <ChevronLeft />
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          router.push(
            pathname +
              '?' +
              createQueryString(
                searchParams.toString(),
                'page',
                String(currentPage + 1),
              ),
          )
        }}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
