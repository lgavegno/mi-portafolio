import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../../App';

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

const H1 = {
  '/odoo': 'Odoo: toda la operación en una plataforma',
  '/dux': 'Dux: tu comercio ordenado en días',
  '/en/odoo': 'Odoo: your whole operation on one platform',
  '/en/dux': 'Dux: your store organized in days',
  '/pt/odoo': 'Odoo: toda a operação em uma plataforma',
  '/pt/dux': 'Dux: seu comércio organizado em dias',
};

describe('SolutionsPage — rutas (AC-16)', () => {
  it.each(Object.entries(H1))('%s renderiza la página con su h1, camino y canonical', async (url, h1) => {
    renderAt(url);
    expect(await screen.findByRole('heading', { level: 1, name: h1 }, { timeout: 5000 })).toBeInTheDocument();
    const path = url.endsWith('odoo') ? 'Odoo' : 'Dux';
    expect(screen.getByRole('button', { name: path, pressed: true })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`https://www.ongevag.com${url}`);
    });
    expect(document.querySelectorAll('link[rel="alternate"][hreflang]').length).toBeGreaterThanOrEqual(4);
  });

  it('el switch navega a la ruta hermana', async () => {
    renderAt('/en/odoo');
    await screen.findByRole('heading', { level: 1, name: H1['/en/odoo'] }, { timeout: 5000 });
    fireEvent.click(screen.getByRole('button', { name: 'Dux', pressed: false }));
    expect(await screen.findByRole('heading', { level: 1, name: H1['/en/dux'] }, { timeout: 5000 })).toBeInTheDocument();
  });

  it('LangSwitcher lleva de /odoo a /en/odoo y /pt/odoo (AC-17)', async () => {
    renderAt('/odoo');
    await screen.findByRole('heading', { level: 1, name: H1['/odoo'] }, { timeout: 5000 });
    fireEvent.click(screen.getAllByRole('button', { name: 'Switch to English' })[0]);
    expect(await screen.findByRole('heading', { level: 1, name: H1['/en/odoo'] }, { timeout: 5000 })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Mudar para Português' })[0]);
    expect(await screen.findByRole('heading', { level: 1, name: H1['/pt/odoo'] }, { timeout: 5000 })).toBeInTheDocument();
  });

  it('oculta el botón flotante de WhatsApp sin ref (FR-19)', async () => {
    renderAt('/dux');
    await screen.findByRole('heading', { level: 1, name: H1['/dux'] }, { timeout: 5000 });
    const generic = [...document.querySelectorAll('a[href^="https://wa.me/"]')].filter((a) => !a.dataset.ref);
    expect(generic).toHaveLength(0);
  });
});

describe('Home — puertas del hero (AC-02, AC-03)', () => {
  it('sin clic no hay sección; con clic en Dux se abre en Dux', async () => {
    Element.prototype.scrollIntoView = vi.fn();
    renderAt('/');
    const door = await screen.findByRole('button', { name: /¿Tenés un comercio\?/ }, { timeout: 5000 });
    expect(document.getElementById('soluciones')).toBeNull();
    fireEvent.click(door);
    expect(await screen.findByRole('heading', { level: 2, name: 'Sistemas de gestión para tu empresa' }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dux', pressed: true })).toBeInTheDocument();
    expect(await screen.findByRole('tab', { name: /Para quién es/, selected: true })).toBeInTheDocument();
  });
});
