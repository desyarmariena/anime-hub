import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Input from './input.client'
import {useSearchParams} from 'next/navigation'

// mock navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('input component', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks()
  })

  test('render input', async () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue(null),
      toString: jest.fn().mockReturnValue(''),
    }

    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
    render(<Input />)

    const inputElement = screen.getByPlaceholderText('Search anime')
    expect(inputElement).toBeInTheDocument()
  })

  test('render input with default keyword', async () => {
    const searchKeyword = 'naruto'
    const mockSearchParams = {
      get: jest
        .fn()
        .mockImplementation(param =>
          param === 'search' ? searchKeyword : null,
        ),
      toString: jest.fn().mockReturnValue('search=naruto'),
    }

    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
    render(<Input />)

    const inputElement = screen.getByDisplayValue('naruto')
    expect(inputElement).toBeInTheDocument()
  })
})
