import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: scrolled ? 'rgba(240, 237, 230, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="DBS Graphic — home"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <img
            src="/logo/Dbs_logo.webp"
            alt="DBS Graphic"
            style={{ height: '26px', width: 'auto', display: 'block' }}
          />
        </button>

        {/* Desktop nav links */}
        <div
          className="hidden md:flex items-center gap-7"
          style={{ opacity: scrolled ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          {[
            { label: 'Vault', id: 'vault' },
            { label: 'Archive', id: 'archive' },
            { label: 'Lab', id: 'lab' },
            { label: 'Process', id: 'process' },
            { label: 'Trust', id: 'trust' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                position: 'relative',
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
            >
              {item.id === 'vault' && (
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--classified, #8B1A1A)',
                    marginRight: '7px',
                    verticalAlign: 'middle',
                  }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
              }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          zIndex: 49,
          backgroundColor: 'rgba(240, 237, 230, 0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {[
          { label: 'Vault', id: 'vault' },
          { label: 'Archive', id: 'archive' },
          { label: 'Lab', id: 'lab' },
          { label: 'Process', id: 'process' },
          { label: 'Trust', id: 'trust' },
          { label: 'Contact', id: 'contact' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 0',
              textAlign: 'left',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
