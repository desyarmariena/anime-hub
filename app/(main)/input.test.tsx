import React from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import Input from './input.client'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'

// mock navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('input component', () => {
  const mockPush = jest.fn()
  const mockPathname = '/'

  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    ;(usePathname as jest.Mock).mockReturnValue(mockPathname)
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

  test('navigates with search query when Enter key is pressed', () => {
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('search=one%20piece'),
      set: jest.fn(),
      delete: jest.fn(),
    }))

    const mockSearchParams = {
      get: jest.fn().mockReturnValue(''),
      toString: jest.fn().mockReturnValue(''),
    }
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)

    render(<Input />)

    const inputElement = screen.getByPlaceholderText('Search anime')
    fireEvent.change(inputElement, {target: {value: 'one piece'}})
    fireEvent.keyDown(inputElement, {key: 'Enter'})

    expect(mockPush).toHaveBeenCalledWith('/?search=one%20piece')
  })

  test('does not navigate when other than Enter key is pressed', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue(''),
      toString: jest.fn().mockReturnValue(''),
    }
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)

    render(<Input />)

    const inputElement = screen.getByPlaceholderText('Search anime')
    fireEvent.change(inputElement, {target: {value: 'one piece'}})
    fireEvent.keyDown(inputElement, {key: 'Space'})

    expect(mockPush).not.toHaveBeenCalled()
  })

  test('remove page param if search anime', () => {
    const mockSearchParamsWithPage = {
      get: jest.fn().mockReturnValue(''),
      toString: jest.fn().mockReturnValue('page=2'),
    }
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParamsWithPage)

    const deleteMock = jest.fn()
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('search=one%20piece'),
      set: jest.fn(),
      delete: deleteMock,
    }))

    render(<Input />)

    // Type and submit
    const inputElement = screen.getByPlaceholderText('Search anime')
    fireEvent.change(inputElement, {target: {value: 'one piece'}})
    fireEvent.keyDown(inputElement, {key: 'Enter'})

    expect(deleteMock).toHaveBeenCalledWith('page')
    expect(mockPush).toHaveBeenCalled()
  })

  test('delete searchparam if search value empty', () => {
    const mockSearchParamsWithSearch = {
      get: jest.fn().mockReturnValue('naruto'),
      toString: jest.fn().mockReturnValue('search=naruto'),
    }
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParamsWithSearch)

    const deleteMock = jest.fn()
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('search=one%20piece'),
      set: jest.fn(),
      delete: deleteMock,
    }))

    render(<Input />)

    const inputElement = screen.getByDisplayValue('naruto')
    fireEvent.change(inputElement, {target: {value: ''}})
    fireEvent.keyDown(inputElement, {key: 'Enter'})

    expect(deleteMock).toHaveBeenCalledWith('page')
    expect(deleteMock).toHaveBeenCalledWith('search')
    expect(mockPush).toHaveBeenCalled()
  })
})
