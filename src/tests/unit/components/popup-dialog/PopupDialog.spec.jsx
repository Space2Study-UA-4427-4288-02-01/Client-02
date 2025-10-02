import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import PopupDialog from '~/components/popup-dialog/PopupDialog'

const closeModal = vi.fn()
const closeModalAfterDelay = vi.fn()

const props = {
  content: 'test',
  closeModal,
  closeModalAfterDelay,
  timerId: null,
  paperProps: {}
}

const renderComponent = (timerId = null) => {
  render(<PopupDialog {...props} timerId={timerId} />)
}

describe('PopupDialog', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render content text', () => {
    renderComponent()
    expect(screen.getByText(props.content)).toBeInTheDocument()
  })

  it('should close popup when mouse leaves content with timerId', async () => {
    renderComponent(21)
    const popupContent = screen.getByTestId('popupContent')

    await user.hover(popupContent)
    await user.unhover(popupContent)

    await waitFor(() => expect(closeModalAfterDelay).toHaveBeenCalled())
  })

  it('should close popup when clicking on overlay', async () => {
    renderComponent()
    const dialog = document.querySelector('.MuiBackdrop-root')

    await user.click(dialog)

    expect(closeModal).toHaveBeenCalled()
  })

  it('should close popup when pressing Escape key', async () => {
    renderComponent()

    await user.keyboard('{Escape}')

    expect(closeModal).toHaveBeenCalled()
  })

  it('should close popup when clicking close icon button', async () => {
    renderComponent()
    const closeButton = screen.getByRole('button')

    await user.click(closeButton)

    expect(closeModal).toHaveBeenCalled()
  })
})
