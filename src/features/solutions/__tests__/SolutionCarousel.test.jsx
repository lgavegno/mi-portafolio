import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { LocaleProvider } from '../../../context/LocaleProvider';
import SolutionCarousel from '../components/SolutionCarousel';
import { slides } from '../data/slides.es';
import { WHATSAPP_NUMBER } from '../../../config/contact';

const renderCarousel = (path = 'odoo', props = {}) =>
  render(
    <LocaleProvider locale="es">
      <SolutionCarousel path={path} slides={slides[path]} {...props} />
    </LocaleProvider>
  );

const tabs = () => screen.getAllByRole('tab').filter((t) => !t.closest('[data-inner-tabs]'));
const selectedIndex = () => tabs().findIndex((t) => t.getAttribute('aria-selected') === 'true');
const panel = () => document.querySelector('[data-slide-ref]');

afterEach(() => vi.useRealTimers());

describe('SolutionCarousel', () => {
  it('arranca en el capítulo 1 con "anterior" deshabilitado (AC-04)', () => {
    renderCarousel();
    expect(tabs()).toHaveLength(7);
    expect(selectedIndex()).toBe(0);
    expect(screen.getByRole('button', { name: 'Capítulo anterior' })).toBeDisabled();
    expect(screen.getByText('Capítulo 1 de 7')).toBeInTheDocument();
  });

  it('siguiente/anterior cambian de capítulo y se deshabilitan en los extremos (AC-04, AC-07)', () => {
    renderCarousel('dux');
    const next = screen.getByRole('button', { name: 'Capítulo siguiente' });
    for (let i = 1; i < 5; i++) fireEvent.click(next);
    expect(selectedIndex()).toBe(4);
    expect(next).toBeDisabled();
    expect(screen.getByText('Capítulo 5 de 5')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Capítulo anterior' }));
    expect(selectedIndex()).toBe(3);
  });

  it('clic en un capítulo lo activa y solo ese tiene aria-selected (AC-05)', () => {
    renderCarousel();
    fireEvent.click(tabs()[4]);
    expect(selectedIndex()).toBe(4);
    expect(tabs().filter((t) => t.getAttribute('aria-selected') === 'true')).toHaveLength(1);
    expect(panel()).toHaveAttribute('data-slide-ref', 'ODOO-S5');
  });

  it('teclado: flechas, Home y End (AC-06)', () => {
    renderCarousel();
    const first = tabs()[0];
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(selectedIndex()).toBe(1);
    fireEvent.keyDown(tabs()[1], { key: 'End' });
    expect(selectedIndex()).toBe(6);
    fireEvent.keyDown(tabs()[6], { key: 'ArrowRight' });
    expect(selectedIndex()).toBe(6);
    fireEvent.keyDown(tabs()[6], { key: 'Home' });
    expect(selectedIndex()).toBe(0);
    fireEvent.keyDown(tabs()[0], { key: 'ArrowLeft' });
    expect(selectedIndex()).toBe(0);
  });

  it('en las pestañas internas de Áreas clave las flechas no cambian de slide (AC-06)', () => {
    renderCarousel();
    fireEvent.click(tabs()[3]);
    const inner = within(document.querySelector('[data-inner-tabs]')).getAllByRole('tab');
    expect(inner).toHaveLength(5);
    fireEvent.keyDown(inner[0], { key: 'ArrowRight' });
    expect(selectedIndex()).toBe(3);
    expect(inner[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('solo el slide activo está montado (AC-07)', () => {
    renderCarousel();
    expect(document.querySelectorAll('[data-slide-ref]')).toHaveLength(1);
  });

  it('no avanza solo (sin autoplay, AC-09)', () => {
    vi.useFakeTimers();
    renderCarousel();
    act(() => vi.advanceTimersByTime(10000));
    expect(selectedIndex()).toBe(0);
  });

  it.each(['odoo', 'dux'])('%s: cada slide tiene WhatsApp con su ref (AC-11)', (path) => {
    renderCarousel(path);
    const next = screen.getByRole('button', { name: 'Capítulo siguiente' });
    slides[path].forEach((slide, i) => {
      const links = document.querySelectorAll(`a[href^="https://wa.me/${WHATSAPP_NUMBER}"]`);
      expect(links.length).toBeGreaterThan(0);
      links.forEach((a) => {
        expect(a.getAttribute('href')).toContain(encodeURIComponent(`(ref: ${slide.ref})`));
        expect(a).toHaveAttribute('target', '_blank');
        expect(a.getAttribute('rel')).toContain('noopener');
      });
      if (i < slides[path].length - 1) fireEvent.click(next);
    });
  });

  it('no muestra cifras sin verificar (FR-16)', () => {
    renderCarousel('dux');
    expect(screen.queryByText('2017')).not.toBeInTheDocument();
    expect(screen.queryByText(/Fuente/)).not.toBeInTheDocument();
  });

  it('muestra cifras verificadas con su fuente', () => {
    renderCarousel('odoo');
    fireEvent.click(tabs()[1]);
    expect(screen.getByText('28 M')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'odoo.com' })).toHaveAttribute('href', 'https://www.odoo.com/page/about-us');
  });

  it('el slide ¿Dux u Odoo? permite cambiar de camino', () => {
    const onSwitchPath = vi.fn();
    renderCarousel('dux', { onSwitchPath });
    fireEvent.click(tabs()[3]);
    fireEvent.click(screen.getByRole('button', { name: /Ver presentación de Odoo/ }));
    expect(onSwitchPath).toHaveBeenCalledWith('odoo');
  });
});
