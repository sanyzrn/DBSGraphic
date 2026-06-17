import { useEffect, useRef } from 'react';

const stats = [
  { value: '16+', label: 'Years of Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '5', label: 'Disciplines Mastered' },
  { value: '∞', label: 'Iterations Until Right' },
];

export default function IntroStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="reveal"
            style={{
              transitionDelay: `${index * 80}ms`,
              padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px)',
              borderRight: index < stats.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 56px)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Manifesto line */}
      <div
        style={{
          padding: 'clamp(32px, 4vw, 48px) clamp(24px, 6vw, 80px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(16px, 2.2vw, 22px)',
            lineHeight: 1.45,
            color: 'var(--text)',
            maxWidth: '560px',
          }}
        >
          "I am not a programmer who learned design.{' '}
          <span style={{ color: 'var(--accent)' }}>
            I am a designer who learned to build systems.
          </span>"
        </p>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
          }}
        >
          — Saeed, Est. 2009
        </div>
      </div>
    </section>
  );
}
