const items = [
  'Pharmaceutical Packaging',
  'Brand Identity Systems',
  'Product Packaging',
  'UI/UX Design',
  'Editorial Design',
  'WordPress Development',
  'AI Solutions',
  'Telegram Bots',
  'Business Automation',
  'Web Applications',
];

export default function Ticker() {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      style={{
        backgroundColor: 'var(--text)',
        borderTop: '1px solid rgba(244, 242, 237, 0.1)',
        borderBottom: '1px solid rgba(244, 242, 237, 0.1)',
        overflow: 'hidden',
        padding: '14px 0',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0',
          animation: 'tickerScroll 40s linear infinite',
          width: 'max-content',
        }}
      >
        {repeated.map((item, index) => (
          <span
            key={index}
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(244, 242, 237, 0.55)',
              whiteSpace: 'nowrap',
              padding: '0 32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {item}
            <span style={{ color: 'var(--accent)', fontSize: '8px', opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </div>

      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(to right, var(--text), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(to left, var(--text), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </div>
  );
}
