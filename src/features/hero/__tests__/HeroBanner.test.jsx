import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '../../../context/LocaleProvider';
import HeroBanner from '../HeroBanner';
import { FEATURES } from '../../../config/features';

const renderHero = (props = {}) =>
  render(
    <MemoryRouter>
      <LocaleProvider locale="es">
        <HeroBanner {...props} />
      </LocaleProvider>
    </MemoryRouter>
  );

describe('HeroBanner — interruptor FEATURES.solutions', () => {
  it('por defecto sigue el valor de src/config/features.js', () => {
    renderHero();
    expect(!!screen.queryByTestId('solution-doors')).toBe(FEATURES.solutions);
  });

  it('modo soluciones: marca oculta a la vista pero con h1 ONGEVAG; puertas visibles', () => {
    renderHero({ showSolutions: true });
    expect(screen.getByRole('heading', { level: 1, name: 'ONGEVAG' })).toBeInTheDocument();
    expect(screen.getByTestId('hero-brand')).toHaveClass('sr-only');
    expect(screen.getByTestId('solution-doors')).toBeInTheDocument();
    expect(screen.getByText('Desarrollador Independiente')).toBeVisible();
  });

  it('modo normal: marca visible y sin puertas', () => {
    renderHero({ showSolutions: false });
    expect(screen.getByTestId('hero-brand')).not.toHaveClass('sr-only');
    expect(screen.getByText('Construyo herramientas digitales para pequeños comercios.')).toBeInTheDocument();
    expect(screen.queryByTestId('solution-doors')).toBeNull();
  });
});
