import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LocaleProvider } from '../../../context/LocaleProvider';
import SolutionDoors from '../components/SolutionDoors';

const Where = () => <p data-testid="where">{useLocation().pathname}</p>;

const renderDoors = ({ onOpen, locale = 'es', at = '/' } = {}) =>
  render(
    <MemoryRouter initialEntries={[at]}>
      <LocaleProvider locale={locale}>
        <SolutionDoors onOpen={onOpen} />
        <Routes>
          <Route path="*" element={<Where />} />
        </Routes>
      </LocaleProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  window.gtag = vi.fn();
});
afterEach(() => {
  delete window.gtag;
});

describe('SolutionDoors', () => {
  it('muestra las dos puertas y el mensaje de derivación', () => {
    renderDoors({ onOpen: vi.fn() });
    expect(screen.getByText('¿Tu empresa necesita un sistema de gestión?')).toBeInTheDocument();
    expect(screen.getByText(/equipo especializado que lo implementa/)).toBeInTheDocument();
    expect(screen.getByText('¿Tenés un comercio?')).toBeInTheDocument();
    expect(screen.getByText('¿Distribuidora, industria o empresa en crecimiento?')).toBeInTheDocument();
  });

  it('abre la sección con el camino elegido y emite solution_door_click (AC-03, AC-15)', () => {
    const onOpen = vi.fn();
    renderDoors({ onOpen });
    fireEvent.click(screen.getByRole('button', { name: /Dux/ }));
    expect(onOpen).toHaveBeenCalledWith('dux');
    expect(window.gtag).toHaveBeenCalledWith('event', 'solution_door_click', { path: 'dux', locale: 'es' });
  });

  it('sin onOpen navega a la página del locale actual', () => {
    renderDoors({ locale: 'en', at: '/en' });
    fireEvent.click(screen.getByRole('button', { name: /Odoo/ }));
    expect(screen.getByTestId('where')).toHaveTextContent('/en/odoo');
  });

  it('los links de WhatsApp llevan HERO-ODOO y HERO-DUX (AC-12)', () => {
    renderDoors({ onOpen: vi.fn() });
    const hrefs = [...document.querySelectorAll('a[href^="https://wa.me/"]')].map((a) => a.getAttribute('href'));
    expect(hrefs).toHaveLength(2);
    expect(hrefs.some((h) => h.includes(encodeURIComponent('(ref: HERO-DUX)')))).toBe(true);
    expect(hrefs.some((h) => h.includes(encodeURIComponent('(ref: HERO-ODOO)')))).toBe(true);
  });

  it('el clic en WhatsApp de una puerta emite solution_whatsapp_click con slide HERO-*', () => {
    renderDoors({ onOpen: vi.fn() });
    const dux = document.querySelector('a[data-ref="HERO-DUX"]');
    dux.addEventListener('click', (e) => e.preventDefault());
    fireEvent.click(dux);
    expect(window.gtag).toHaveBeenCalledWith('event', 'solution_whatsapp_click', {
      path: 'dux', slide: 'HERO-DUX', locale: 'es', entry: 'home',
    });
  });
});
