import { useEffect, useRef } from 'react';

const projects = [
  {
    number: '001',
    category: 'Pharmaceutical Packaging',
    title: 'Medical Trust Series',
    description:
      'A comprehensive pharmaceutical packaging system designed for a clinical portfolio of injectable and oral medications. Built on a framework of regulatory compliance, clinical precision, and patient confidence — where every typographic decision is a dosage of trust.',
    tags: ['Packaging Design', 'Regulatory', 'Brand System'],
    image: '/images/packaging-01.jpg',
    year: '2023',
    align: 'left',
  },
  {
    number: '002',
    category: 'Product Packaging',
    title: 'Luxury Wellness Identity',
    description:
      'Full packaging ecosystem for a premium wellness brand. Materials, finishes, and structure were treated as communication tools — the unboxing experience designed to feel like an extension of the brand promise.',
    tags: ['Packaging', 'Brand Identity', 'Premium'],
    image: '/images/packaging-02.jpg',
    year: '2022',
    align: 'right',
  },
  {
    number: '003',
    category: 'Catalog Design',
    title: 'Editorial Product Archive',
    description:
      'A 200-page product catalog created as a design artifact in its own right. The publication follows a strict editorial system — each spread composed as a standalone visual statement, yet unified by an invisible grid.',
    tags: ['Editorial', 'Catalog', 'Typography'],
    image: '/images/catalog-01.jpg',
    year: '2022',
    align: 'left',
  },
  {
    number: '004',
    category: 'Brand Identity',
    title: 'Corporate Identity System',
    description:
      'A complete brand identity system built for longevity. Identity marks, color philosophy, typographic hierarchy, stationery, and environmental applications — all designed as a single, cohesive language of trust.',
    tags: ['Brand Identity', 'Identity System', 'Visual Language'],
    image: '/images/brand-01.jpg',
    year: '2021',
    align: 'right',
  },
  {
    number: '005',
    category: 'UI/UX Design',
    title: 'Healthcare Digital Platform',
    description:
      'End-to-end UX design for a healthcare management platform. User research, information architecture, interaction design, and high-fidelity prototypes — built with the understanding that good UX in healthcare is a matter of patient safety.',
    tags: ['UI Design', 'UX Research', 'Healthcare'],
    image: '/images/ui-01.jpg',
    year: '2023',
    align: 'left',
  },
];

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  const isLeft = project.align === 'left';

  return (
    <article
      style={{
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: 'clamp(60px, 8vw, 120px)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div
        className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-start`}
        style={{ padding: '0 clamp(24px, 6vw, 80px)' }}
      >
        {/* Text block */}
        <div
          ref={rowRef}
          className={`reveal ${isLeft ? '' : 'reveal-right'} flex-1 lg:max-w-sm`}
          style={{
            paddingTop: 'clamp(0px, 4vw, 60px)',
            transitionDelay: `${index * 80}ms`,
          }}
        >
          {/* Project number + category */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--accent)',
              }}
            >
              {project.number}
            </span>
            <div style={{ height: '1px', width: '32px', backgroundColor: 'var(--border)' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '24px',
            }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--muted)',
              marginBottom: '32px',
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Year */}
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--border)',
              textTransform: 'uppercase',
            }}
          >
            {project.year}
          </div>
        </div>

        {/* Image block */}
        <div
          ref={imgRef}
          className="reveal-scale flex-1 w-full project-image-wrap img-reveal"
          style={{
            transitionDelay: `${index * 80 + 150}ms`,
            borderRadius: '4px',
            overflow: 'hidden',
            minHeight: 'clamp(280px, 45vw, 540px)',
            backgroundColor: 'var(--surface)',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              minHeight: 'clamp(280px, 45vw, 540px)',
            }}
          />
        </div>
      </div>

      {/* Decorative number */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(40px, 6vw, 80px)',
          [isLeft ? 'right' : 'left']: 'clamp(24px, 4vw, 60px)',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(60px, 10vw, 120px)',
          lineHeight: 1,
          color: 'var(--text)',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {project.number}
      </div>
    </article>
  );
}

export default function Archive() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="archive"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
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
            Section 01
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
            The<br />Archive
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
          16+ years of selected work. Not everything is shown. What is shown is worth examining carefully.
        </p>
      </div>

      {/* Projects */}
      {projects.map((project, index) => (
        <ProjectRow key={project.number} project={project} index={index} />
      ))}

      {/* Archive footer note */}
      <div
        style={{
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 6vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          opacity: 0.45,
        }}
      >
        <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }} />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
          }}
        >
          End of Selected Archive
        </span>
        <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }} />
      </div>
    </section>
  );
}
