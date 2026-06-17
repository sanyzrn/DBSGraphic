import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Research',
    description:
      'Every brief contains a problem. Finding that problem — the real one, not the stated one — requires systematic research. Market context, competitive landscape, user behavior, and the invisible rules of the industry.',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Design without strategy is decoration. Strategy translates research into decisions: what the brand must communicate, what it must avoid, and the singular idea that will guide every visual and systemic choice.',
    duration: '1 week',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'This is where the invisible becomes visible. Typography, color, space, hierarchy, form — each decision made against a strategic reason. No decoration without purpose. No element without intention.',
    duration: '2–3 weeks',
  },
  {
    number: '04',
    title: 'Prototype',
    description:
      'Before anything goes to print or production, it must be tested. Interactive prototypes, print dummies, material samples — reality reveals what screens hide.',
    duration: '1 week',
  },
  {
    number: '05',
    title: 'Development',
    description:
      'For digital products: clean, maintainable code. For physical products: production-ready artwork, precise technical specifications, and print-ready files that printers don\'t have to fix.',
    duration: '1–4 weeks',
  },
  {
    number: '06',
    title: 'Launch',
    description:
      'Delivery is not the end. Launch includes handoff documentation, brand guidelines, technical specifications, and — when needed — ongoing support to maintain design integrity over time.',
    duration: 'Ongoing',
  },
];

export default function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    stepsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        className="reveal"
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(40px, 5vw, 60px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="section-label" style={{ marginBottom: '16px' }}>
            Section 03
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(42px, 8vw, 100px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            Process
          </h2>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--muted)',
            maxWidth: '320px',
          }}
        >
          A methodology refined over 16 years of working with pharmaceutical companies, global brands, and ambitious founders.
        </p>
      </div>

      {/* Timeline */}
      <div
        style={{
          padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
        }}
      >
        {steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => { stepsRef.current[index] = el; }}
            className="reveal"
            style={{
              transitionDelay: `${index * 100}ms`,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(24px, 4vw, 60px)',
              position: 'relative',
              paddingBottom: index < steps.length - 1 ? 'clamp(40px, 5vw, 72px)' : 0,
            }}
          >
            {/* Left: number + vertical line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                paddingTop: '8px',
              }}
            >
              {/* Number circle */}
              <div
                style={{
                  width: 'clamp(40px, 5vw, 56px)',
                  height: 'clamp(40px, 5vw, 56px)',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(11px, 1.5vw, 13px)',
                    color: 'var(--accent)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    width: '1px',
                    backgroundColor: 'var(--border)',
                    marginTop: '12px',
                    minHeight: '40px',
                  }}
                />
              )}
            </div>

            {/* Right: content */}
            <div style={{ paddingBottom: '8px' }}>
              {/* Title row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  gap: '16px',
                  marginBottom: '16px',
                  paddingTop: 'clamp(8px, 1vw, 12px)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(22px, 3vw, 36px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}
                >
                  {step.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    opacity: 0.7,
                  }}
                >
                  {step.duration}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.85,
                  color: 'var(--muted)',
                  maxWidth: '560px',
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
