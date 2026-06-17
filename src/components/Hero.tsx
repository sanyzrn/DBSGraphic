import { useEffect, useRef, useState } from 'react';
import { useSiteConfig } from '../config/siteConfig';

interface HeroProps {
  onNameTripleClick: () => void;
}

export default function Hero({ onNameTripleClick }: HeroProps) {
  const { config } = useSiteConfig();
  const { name, tagline, year, descriptor } = config.hero;
  const [loaded, setLoaded] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs we drive directly on scroll — no state, so no per-frame re-render.
  const contentRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax driven through refs + rAF instead of React state.
  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const heroOpacity = Math.max(0, 1 - y / 600);
      const translate = y * 0.15;

      if (contentRef.current) {
        contentRef.current.style.opacity = String(heroOpacity);
        contentRef.current.style.transform = `translateY(${translate}px)`;
      }
      if (topLeftRef.current) topLeftRef.current.style.opacity = String(heroOpacity);
      if (topRightRef.current) topRightRef.current.style.opacity = String(heroOpacity);
      if (scrollHintRef.current)
        scrollHintRef.current.style.opacity = String(Math.min(1, heroOpacity * 1.2));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  const handleNameClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onNameTripleClick();
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 600);
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Top floating identifiers */}
      <div
        ref={topLeftRef}
        className="fixed top-6 left-6 z-20 pointer-events-none"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        <div
          className="section-label mb-1"
          style={{ transitionDelay: '400ms', fontSize: '9px' }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: 'var(--text)',
            lineHeight: '1.7',
            opacity: 0.6,
          }}
        >
          Designer<br />
          Builder<br />
          Problem Solver
        </div>
      </div>

      {/* Top right metadata */}
      <div
        ref={topRightRef}
        className="fixed top-6 right-6 z-20 text-right pointer-events-none"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease 0.5s',
          fontSize: '9px',
          fontFamily: 'Inter, sans-serif',
          color: 'var(--muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          lineHeight: '1.8',
        }}
      >
        <div>Packaging</div>
        <div>Brand Systems</div>
        <div>Digital Products</div>
      </div>

      {/* Main hero content */}
      <div
        ref={contentRef}
        className="flex-1 flex flex-col items-center justify-center px-6"
        style={{
          opacity: 1,
          transform: 'translateY(0)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Brand crest */}
        <img
          src="/logo/Dbs_logo_single.png"
          alt="DBS Graphic"
          style={{
            height: 'clamp(40px, 5vw, 56px)',
            width: 'auto',
            marginBottom: '28px',
            opacity: loaded ? 0.95 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1s ease 0.1s, transform 1s ease 0.1s',
          }}
        />

        {/* Section index */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            fontSize: '9px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '48px',
          }}
        >
          Est. 2009 — Senior Designer & Builder
        </div>

        {/* Name */}
        <div
          className="relative cursor-default select-none"
          onClick={handleNameClick}
          title=""
        >
          <h1
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(80px, 22vw, 280px)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(40px)',
              transition:
                'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              userSelect: 'none',
            }}
          >
            {/* Cyberpunk glitch wordmark — a museum artifact briefly carrying signal */}
            <span
              className="glitch-name"
              data-text={name}
              style={{ display: 'inline-block' }}
            >
              {name}
            </span>
          </h1>

          {/* Hidden hint — only shows on triple click */}
          <div
            style={{
              position: 'absolute',
              bottom: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '8px',
              fontFamily: 'SF Mono, Fira Code, monospace',
              color: 'var(--accent)',
              opacity: 0.3,
              whiteSpace: 'nowrap',
              letterSpacing: '0.2em',
            }}
          >
            · · ·
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: '52px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
          }}
        >
          <div
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(18px, 4vw, 40px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            <div>{tagline}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div
                style={{
                  width: 'clamp(20px, 3vw, 40px)',
                  height: '1px',
                  backgroundColor: 'var(--accent)',
                }}
              />
              <span>{year}</span>
              <div
                style={{
                  width: 'clamp(20px, 3vw, 40px)',
                  height: '1px',
                  backgroundColor: 'var(--accent)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Descriptor */}
        <div
          style={{
            marginTop: '40px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1.0s ease 0.8s, transform 1.0s ease 0.8s',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--muted)',
              letterSpacing: '0.06em',
              maxWidth: '380px',
            }}
          >
            {descriptor}
          </p>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        ref={scrollHintRef}
        className="flex flex-col items-center pb-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease 1.2s',
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '12px',
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: '1px',
            height: '40px',
            backgroundColor: 'var(--accent)',
            opacity: 0.5,
            animation: 'scrollLineAnim 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollLineAnim {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.3); }
        }
      `}</style>
    </section>
  );
}
