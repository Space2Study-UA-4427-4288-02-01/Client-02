import { describe } from 'vitest'
import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { BrowserRouter } from 'react-router-dom'

describe('EnhancedTableRow', () => {
  const mockHandleSelectClick = vi.fn()
  const mockRefetch = vi.fn()
  const mockAction = vi.fn()
  const rowData = { _id: '1', name: 'Jhon', price: '20' }

  const baseProps = {
    columns: [
      { field: 'name', label: 'Name' },
      { field: 'price', label: 'Price' }
    ],
    isSelection: true,
    item: rowData,
    refetchData: mockRefetch,
    rowActions: [{ label: 'Edit', func: mockAction }],
    select: {
      isSelected: vi.fn().mockReturnValue(false),
      handleSelectClick: mockHandleSelectClick
    },
    selectedRows: []
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderRow = (props = {}) =>
    render(
      <BrowserRouter>
        <table>
          <tbody>
            <EnhancedTableRow {...baseProps} {...props} />
          </tbody>
        </table>
      </BrowserRouter>
    )

  it('should render table row with correct data', () => {
    renderRow()
    expect(screen.getByText('Jhon')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('should call handleSelectClick when checkbox is clicked', async () => {
    renderRow()

    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(mockHandleSelectClick).toHaveBeenCalled()
    expect(mockHandleSelectClick).toHaveBeenCalledWith(expect.anything(), '1')
  })

  it('should render action menu when menu icon is clicked', async () => {
    renderRow()

    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('should call onAction function when clicking on the menu item', async () => {
    renderRow()

    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    const menuItem = screen.getByText('Edit')
    await userEvent.click(menuItem)

    expect(mockAction).toHaveBeenCalledWith('1')
    expect(mockRefetch).toHaveBeenCalled()
  })

  it('should close menu when "escape" is pressed', async () => {
    renderRow()

    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
  })
})
