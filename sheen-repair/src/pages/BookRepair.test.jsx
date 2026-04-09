import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { RepairCatalogProvider } from '../context/RepairCatalogContext'
import BookRepair from './BookRepair'

function renderBookRepair(initialEntry) {
  return render(
    <HelmetProvider>
      <RepairCatalogProvider>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/book-repair" element={<BookRepair />} />
          </Routes>
        </MemoryRouter>
      </RepairCatalogProvider>
    </HelmetProvider>,
  )
}

describe('BookRepair', () => {
  it('prefills the repair path from the URL search params', () => {
    renderBookRepair('/book-repair?category=phones&brand=apple&model=iphone-15&repair=Charging%20Port%20Repair')

    expect(screen.getByLabelText('Category')).toHaveValue('phones')
    expect(screen.getByLabelText('Brand')).toHaveValue('apple')
    expect(screen.getByLabelText('Model')).toHaveValue('iphone-15')
    expect(screen.getByLabelText('Repair type')).toHaveValue('Charging Port Repair')
  })

  it('submits a booking and stores it for the admin queue', async () => {
    const user = userEvent.setup()

    renderBookRepair('/book-repair?category=phones&brand=apple&model=iphone-15&repair=Battery%20Service')

    await user.type(screen.getByLabelText('Your name'), 'Kamran Test')
    await user.type(screen.getByLabelText('Phone number'), '07123456789')
    await user.click(screen.getByRole('button', { name: 'Submit repair booking' }))

    expect(await screen.findByText('Repair request saved')).toBeInTheDocument()

    const bookings = JSON.parse(window.localStorage.getItem('sheen-repair.bookings.v1') || '[]')

    expect(bookings).toHaveLength(1)
    expect(bookings[0]).toMatchObject({
      customerName: 'Kamran Test',
      model: 'iPhone 15',
      repair: 'Battery Service',
    })
  })
})