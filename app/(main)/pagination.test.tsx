import React from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import Pagination from './pagination.client'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('pagination component', () => {
  test('does not render pagination if data does not have next page', async () => {
    render(<Pagination currentPage={1} hasNextPage={false} />)

    const navigateButton = screen.queryByTestId('next-page')
    expect(navigateButton).not.toBeInTheDocument()
  })

  test('render pagination next button if data have next page', async () => {
    render(<Pagination currentPage={1} hasNextPage={true} />)

    const navigateButton = screen.queryByTestId('next-page')
    expect(navigateButton).toBeInTheDocument()
  })

  test('render pagination prev button if current page > 1', async () => {
    render(<Pagination currentPage={2} hasNextPage={false} />)

    const navigateButton = screen.queryByTestId('prev-page')
    expect(navigateButton).toBeInTheDocument()
  })
})
