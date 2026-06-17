import { useEffect, useRef } from 'react';

/**
 * TIMELINE OF TRUST — provenance, not a résumé.
 * Each entry is a moment trust was placed and kept, arranged like the
 * provenance wall of a museum: a continuous spine, plaques alternating
 * left and right, sealed nodes marking each event.
 */

interface Milestone {
  era: string;
  title: string;
  body: string;
  marker: string;
}

const milestones: Milestone[] = [
  {
    era: '2009',
    title: 'The First Signature',
    body: 'A pharmaceutical founder handed over an entire product line on nothing but a handshake — trust extended before there was a portfolio to justify it.',
    marker: 'I',
  },
  {
    era: '2013',
    title: 'Approved, Untouched',
    body: 'A regulatory reviewer returned a label system without a single correction. The rarest compliment in medicine is silence.',
    marker: 'II',
  },
  {
    era: '2016',
    title: 'The Box They Kept',
    body: 'Packaging meant to be discarded became something patients did not want to throw away. A ritual formed around an object designed to be thrown out.',
    marker: 'III',
  },
  {
    era: '2019',
    title: 'Trusted with the Invisible',
    body: 'Invited to design the systems no patient would ever see, yet every patient would depend on — the quiet machinery beneath the care.',
    marker: 'IV',
  },
  {
    era: '2022',
    title: 'Two Hundred, Zero Recalled',
    body: 'The two-hundredth delivered project. None recalled. None reprinted for error. A clean record, kept on purpose — not by luck.',
    marker: 'V',
  },
  {
    era: '2025',
    title: 'Cited as the Standard',
    body: 'Competitors began referencing the work as the benchmark for medical trust. The quietest form of authority is being copied carefully.',
    marker: 'VI',
  },
];

function TimelineRow({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`trust-item ${isLeft ? 'reveal-left' : 'reveal-right'}`}
      style={{
        position: 'relative',
        display: 'grid',
        // desktop: [left plaque | spine | right plaque]; mobile handled below
        gridTemplateColumns: 'var(--tl-cols)',
        alignItems: 'center',
        columnGap: 'clamp(20px, 3vw, 44px)',
        marginBottom: 'clamp(28px, 4vw, 56px)',
      }}
    >
      {/* Plaque side */}
      <div
        style={{
          gridColumn: 'var(--tl-plaque-col)',
          gridRow: 1,
          textAlign: 'var(--tl-text-align)' as React.CSSProperties['textAlign'],
        }}
      >
        <div className="trust-plaque" style={{ padding: 'clamp(20px, 2.6vw, 30px)', display: 'inline-block', textAlign: 'left', maxWidth: '420px' }}>
          <div
            className="mono"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              marginBottom: '12px',
            }}
          >
            {m.era}
          </div>
          <h3
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(20px, 2.6vw, 30px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginBottom: '14px',
            }}
          >
            {m.title}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--muted)',
            }}
          >
            {m.body}
          </p>
        </div>
      </div>

      {/* Node on the spine */}
      <div
        style={{
          gridColumn: 'var(--tl-node-col)',
          gridRow: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="trust-node">
          <span
            className="mono"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-22px',
              fontSize: '8px',
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              opacity: 0.6,
            }}
          >
            {m.marker}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large ghost word */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(40px, 6vw, 90px)',
          right: '-0.04em',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(70px, 16vw, 220px)',
          lineHeight: 1,
          color: 'var(--text)',
          opacity: 0.035,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        TRUST
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="reveal"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(64px, 9vw, 110px) clamp(24px, 6vw, 80px) clamp(40px, 5vw, 70px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '16px',
            }}
          >
            Provenance
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 7.5vw, 96px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            Timeline<br />of Trust
          </h2>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--muted)',
            maxWidth: '340px',
          }}
        >
          Not a résumé. Not a career history. A record of the moments trust was placed —
          and the discipline of keeping it.
        </p>
      </div>

      {/* The provenance wall */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 60px) clamp(64px, 9vw, 120px)',
        }}
      >
        {/* spine */}
        <div className="trust-spine" style={{ left: 'var(--tl-spine-left)' }} aria-hidden="true" />

        {milestones.map((m, i) => (
          <TimelineRow key={m.era} m={m} index={i} />
        ))}
      </div>

      {/* responsive grid variables: center spine on desktop, left rail on mobile */}
      <style>{`
        #trust {
          --tl-cols: 24px 1fr;
          --tl-spine-left: 12px;
          --tl-node-col: 1;
          --tl-plaque-col: 2;
          --tl-text-align: left;
        }
        #trust .trust-item { padding-left: 0; }
        @media (min-width: 860px) {
          #trust {
            --tl-cols: 1fr 24px 1fr;
            --tl-spine-left: 50%;
            --tl-node-col: 2;
          }
          /* the absolute .trust-spine is child #1, so parity is offset by one:
             even children are the 1st, 3rd, 5th milestones (start left). */
          #trust .trust-item:nth-child(even) {
            --tl-plaque-col: 1;
            --tl-text-align: right;
          }
          #trust .trust-item:nth-child(odd) {
            --tl-plaque-col: 3;
            --tl-text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
