import React, { useState, useEffect } from 'react';

export default function SectionDivider({
  variant = 'wave',
  fromColor,
  toColor,
  height = 64,
  overlapLabel,
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (prefersReducedMotion) {
    return (
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid',
          borderColor: fromColor,
          margin: 0,
        }}
      />
    );
  }

  const svgProps = {
    preserveAspectRatio: 'none',
    viewBox: `0 0 1440 ${height}`,
    width: '100%',
    style: { display: 'block' },
  };

  const waveContent = (
    <svg {...svgProps}>
      <path
        d={`M0,0 C360,${height} 1080,0 1440,${height} L1440,${height} L0,${height} Z`}
        fill={toColor}
      />
    </svg>
  );

  const bowlContent = (
    <svg {...svgProps}>
      <path
        d={`M0,0 Q720,${height * 2} 1440,0 L1440,${height} L0,${height} Z`}
        fill={toColor}
      />
    </svg>
  );

  const overlapContent = (
    <>
      <svg {...svgProps}>
        <path
          d={`M0,0 C360,${height} 1080,0 1440,${height} L1440,${height} L0,${height} Z`}
          fill={toColor}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            backgroundColor: '#F1F0E8',
            border: '0.5px solid #ADC4CE',
            padding: '12px 28px',
            borderRadius: '8px',
            boxShadow: '0 4px 24px rgba(44, 51, 64, 0.12)',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#2C3340',
            whiteSpace: 'nowrap',
          }}
        >
          {overlapLabel}
        </div>
      </div>
    </>
  );

  const getContent = () => {
    switch (variant) {
      case 'wave':
        return waveContent;
      case 'bowl':
        return bowlContent;
      case 'overlap':
        return overlapContent;
      default:
        return waveContent;
    }
  };

  return (
    <div
      style={{
        lineHeight: 0,
        display: 'block',
        position: 'relative',
        backgroundColor: fromColor,
      }}
    >
      {getContent()}
    </div>
  );
}
