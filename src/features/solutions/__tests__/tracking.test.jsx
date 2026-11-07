import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '../../../context/LocaleProvider';
import SolutionsSection from '../components/SolutionsSection';

const events = (name) => window.gtag.mock.calls.filter((c) => c[1] === name).map((c) => c[2]);

beforeEach(() => {
  window.gtag = vi.fn();
});
afterEach(() => {
  delete window.gtag;
});

describe('tracking GA4 de la sección (AC-15)', () => {
  it('slide_view una vez por ref, whatsapp_click con path y slide', async () => {
    render(
      <LocaleProvider locale="es">
        <SolutionsSection path="odoo" onPathChange={() => {}} entry="home" />
      </LocaleProvider>
    );
    const next = await screen.findByRole('button', { name: 'Capítulo siguiente' });
    expect(events('solution_slide_view')).toEqual([{ path: 'odoo', slide: 'ODOO-S1', locale: 'es', entry: 'home' }]);

    fireEvent.click(next);
    fireEvent.click(screen.getByRole('button', { name: 'Capítulo anterior' }));
    fireEvent.click(next);
    expect(events('solution_slide_view').map((e) => e.slide)).toEqual(['ODOO-S1', 'ODOO-S2']);

    const wa = document.querySelector('a[data-ref="ODOO-S2"]');
    wa.addEventListener('click', (e) => e.preventDefault());
    fireEvent.click(wa);
    expect(events('solution_whatsapp_click')).toEqual([{ path: 'odoo', slide: 'ODOO-S2', locale: 'es', entry: 'home' }]);
  });

  it('cambiar de camino con el switch avisa al padre', async () => {
    const onPathChange = vi.fn();
    render(
      <LocaleProvider locale="es">
        <SolutionsSection path="odoo" onPathChange={onPathChange} />
      </LocaleProvider>
    );
    await screen.findByRole('button', { name: 'Capítulo siguiente' });
    expect(screen.getByRole('button', { name: 'Odoo' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Dux' }));
    expect(onPathChange).toHaveBeenCalledWith('dux');
  });

  it('la sección de la home tiene id="soluciones", h2 y aviso de marcas', async () => {
    render(
      <LocaleProvider locale="es">
        <SolutionsSection path="dux" onPathChange={() => {}} />
      </LocaleProvider>
    );
    await screen.findByRole('button', { name: 'Capítulo siguiente' });
    expect(document.getElementById('soluciones')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Sistemas de gestión para tu empresa' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /comercios y pymes/ })).toBeInTheDocument();
    expect(screen.getAllByText(/ONGEVAG no es partner oficial/).length).toBeGreaterThan(0);
  });
});
