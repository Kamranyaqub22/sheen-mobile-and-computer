import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RepairCatalogProvider, useRepairCatalog } from './RepairCatalogContext'

function CatalogCount() {
  const { catalog } = useRepairCatalog()

  return <div data-testid="catalog-count">{catalog.length}</div>
}

describe('RepairCatalogProvider', () => {
  it('falls back to seed data when stored catalog JSON is invalid', () => {
    window.localStorage.setItem('sheen-repair.catalog.v1', '{invalid-json')

    render(
      <RepairCatalogProvider>
        <CatalogCount />
      </RepairCatalogProvider>,
    )

    expect(Number(screen.getByTestId('catalog-count').textContent)).toBeGreaterThan(0)
  })
})