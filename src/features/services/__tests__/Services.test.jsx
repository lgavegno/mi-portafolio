import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LocaleProvider } from '../../../context/LocaleProvider';
import Services from '../Services';

const renderServices = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <LocaleProvider locale="es">
          <Services />
        </LocaleProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

const cards = () => [...document.querySelectorAll('.carousel-card')];

describe('Services — carrusel 3D accesible', () => {
  it('solo la tarjeta de frente es accesible; las de atrás quedan inertes', () => {
    renderServices();
    const all = cards();
    expect(all.length).toBeGreaterThan(1);
    expect(all[0]).toHaveAttribute('aria-hidden', 'false');
    all.slice(1).forEach((card) => {
      expect(card).toHaveAttribute('aria-hidden', 'true');
      expect(card.hasAttribute('inert')).toBe(true);
    });
  });

  it('los links de la tarjeta de sistemas de gestión solo son accesibles cuando está de frente', () => {
    renderServices();
    const solutionsCard = cards().find((c) => c.querySelector('a[href="/odoo"]'));
    expect(solutionsCard).toHaveAttribute('aria-hidden', 'true');
    const index = cards().indexOf(solutionsCard);
    fireEvent.click(screen.getAllByRole('button', { name: /Ir al servicio/ })[index]);
    expect(solutionsCard).toHaveAttribute('aria-hidden', 'false');
    expect(solutionsCard.hasAttribute('inert')).toBe(false);
  });
});
