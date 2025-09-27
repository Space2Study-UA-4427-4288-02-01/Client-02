import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  let setSearchMock = vi.fn()

  it('renders with initial value', () => {
    render(<SearchInput search='initial' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('initial')
  })

  it('updates local state when typing', () => {
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(input.value).toBe('hello')
    expect(setSearchMock).not.toHaveBeenCalled()
  })

  it('calls setSearch when pressing Enter', () => {
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'world' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(setSearchMock).toHaveBeenCalledWith('world')
  })

  it('calls setSearch when clicking search icon', () => {
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'react' } })

    const searchBtn = screen.getByTestId('search-icon')
    fireEvent.click(searchBtn)

    expect(setSearchMock).toHaveBeenCalledWith('react')
  })

  it('clears search when clicking clear icon', () => {
    render(<SearchInput search='some text' setSearch={setSearchMock} />)

    const clearBtn = screen.getByTestId('delete-icon')
    fireEvent.click(clearBtn)

    expect(setSearchMock).toHaveBeenCalledWith('')
  })
})
