import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  let setSearchMock
  const user = userEvent.setup()

  const createWrapper = (searchVal = '') => {
    setSearchMock = vi.fn()
    render(<SearchInput search={searchVal} setSearch={setSearchMock} />)
  }

  it('renders with initial value', () => {
    createWrapper('initial')

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('initial')
  })

  it('updates local state when typing', async () => {
    createWrapper()

    const input = screen.getByRole('textbox')
    await user.type(input, 'hello')

    expect(input.value).toBe('hello')
    expect(setSearchMock).not.toHaveBeenCalled()
  })

  it('calls setSearch when pressing Enter', async () => {
    createWrapper()

    const input = screen.getByRole('textbox')
    await user.type(input, 'world{enter}')

    expect(setSearchMock).toHaveBeenCalledWith('world')
  })

  it('calls setSearch when clicking search icon', async () => {
    createWrapper()

    const input = screen.getByRole('textbox')
    await user.type(input, 'react')

    const searchBtn = screen.getByTestId('search-icon')
    await user.click(searchBtn)

    expect(setSearchMock).toHaveBeenCalledWith('react')
  })

  it('clears search when clicking clear icon', async () => {
    createWrapper('some text')

    const clearBtn = screen.getByTestId('delete-icon')
    await user.click(clearBtn)

    expect(setSearchMock).toHaveBeenCalledWith('')
  })
})
