import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocaleProvider } from '../../../context/LocaleProvider';
import AgenciasHero from '../AgenciasHero';
import { viewportConfig, revealContainer } from '../../../config/motionConfig';

vi.mock('../../../components/WireframeGeometry', () => ({
  default: () => <div data-testid="wireframe" />,
}));

const setDesktop = (matches) =>
  window.matchMedia.mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

const renderHero = () =>
  render(
    <LocaleProvider locale="es">
      <AgenciasHero />
    </LocaleProvider>
  );

afterEach(() => setDesktop(false));

describe('/agencias en mobile', () => {
  it('el revelado no exige un porcentaje del bloque en pantalla', () => {
    expect(viewportConfig.amount).toBe('some');
  });

  it('el contenedor no oculta el contenido con su propia opacidad', () => {
    expect(revealContainer.hidden).not.toHaveProperty('opacity');
  });

  it('no monta la figura 3D en mobile', () => {
    setDesktop(false);
    renderHero();
    expect(screen.queryByTestId('wireframe')).toBeNull();
  });

  it('monta la figura 3D en desktop', async () => {
    setDesktop(true);
    renderHero();
    expect(await screen.findByTestId('wireframe')).toBeInTheDocument();
  });
});
