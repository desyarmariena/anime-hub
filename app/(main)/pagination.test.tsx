import React from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import Pagination from './pagination.client'
import {createQueryString} from '@/utils/query'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('@/utils/query', () => ({
  createQueryString: jest.fn(),
}))

describe('pagination component', () => {
  const mockPush = jest.fn()
  const mockPathname = '/'
  const mockSearchParamsString = ''

  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    ;(usePathname as jest.Mock).mockReturnValue(mockPathname)
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParamsString)
    ;(createQueryString as jest.Mock).mockImplementation(
      (search, key, value) => {
        const newParams = new URLSearchParams(search)
        newParams.set(key, value)
        return newParams.toString()
      },
    )
  })

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

  test('navigate to next page', async () => {
    render(<Pagination currentPage={1} hasNextPage={true} />)

    fireEvent.click(screen.getByTestId('next-page'))
    expect(createQueryString).toHaveBeenCalledWith(
      mockSearchParamsString,
      'page',
      String(2),
    )
    expect(mockPush).toHaveBeenCalledWith('/?page=2')
  })

  test('navigate to prev page', async () => {
    render(<Pagination currentPage={3} hasNextPage={true} />)

    fireEvent.click(screen.getByTestId('prev-page'))
    expect(createQueryString).toHaveBeenCalledWith(
      mockSearchParamsString,
      'page',
      String(2),
    )
    expect(mockPush).toHaveBeenCalledWith('/?page=2')
  })

  test('navigate to prev page with search keyword', async () => {
    const currentPage = 2
    const mockSearchParams = {
      get: jest.fn().mockReturnValue(''),
      toString: jest.fn().mockReturnValue(`search=nar&page=${currentPage}`),
    }
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)

    render(<Pagination currentPage={currentPage} hasNextPage={true} />)

    fireEvent.click(screen.getByTestId('prev-page'))
    expect(createQueryString).toHaveBeenCalledWith(
      mockSearchParams.toString(),
      'page',
      String(currentPage - 1),
    )
    expect(mockPush).toHaveBeenCalledWith('/?search=nar&page=1')
  })
})
