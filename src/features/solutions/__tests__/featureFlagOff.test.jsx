// FEATURES.solutions = false → alianza terminada (spec rev. 1.4)
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../../App';

vi.mock('../../../config/features', () => ({ FEATURES: { solutions: false } }));
vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
window.scrollTo = vi.fn();

const renderAt = (url) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('FEATURES.solutions = false', () => {
  it.each([
    ['/odoo', 'Construyo herramientas digitales para pequeños comercios.'],
    ['/en/dux', 'I build digital tools for small businesses.'],
    ['/pt/odoo', 'Construo ferramentas digitais para pequenos negócios.'],
  ])('%s redirige a la home del idioma con el hero normal', async (url, description) => {
    renderAt(url);
    expect(await screen.findByText(description, {}, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.queryByTestId('solution-doors')).toBeNull();
    expect(screen.getByTestId('hero-brand')).not.toHaveClass('sr-only');
    expect(document.querySelectorAll('a[href^="https://wa.me/"][data-ref]')).toHaveLength(0);
  });
});
