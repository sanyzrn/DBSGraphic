import { useEffect, useRef } from 'react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const profileData = [
  { label: 'Status', value: 'Active', highlight: true },
  { label: 'Full Name', value: 'Saeed Zarrini' },
  { label: 'Classification', value: 'Senior Graphic Designer · Packaging Specialist' },
  { label: 'Years Active', value: '16+ Years (Est. 2007)' },
  { label: 'Primary Discipline', value: 'Pharmaceutical Packaging Design' },
  { label: 'Secondary Discipline', value: 'Visual Identity & Brand Systems' },
  { label: 'Tertiary Discipline', value: 'UI/UX Design · Web Development' },
  { label: 'Design Stack', value: 'Photoshop · Illustrator · Adobe XD · Figma · InDesign' },
  { label: 'Build Stack', value: 'WordPress · HTML · CSS · JavaScript' },
  { label: 'Current Clients', value: 'Nafas Pharmed · Busun Pharmed' },
  { label: 'Profile ID', value: 'SRD-SZ-2007 / CONFIDENTIAL' },
];

export default function DossierModal({ isOpen, onClose }: DossierModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(22, 22, 22, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="System Profile Dossier"
    >
      <div
        ref={dialogRef}
        className="dossier-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            backgroundColor: '#1A1916',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28C840' }} />
          </div>
          <span
            style={{
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '11px',
              color: 'rgba(244, 242, 237, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            system_profile.classified
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(244, 242, 237, 0.4)',
              fontSize: '16px',
              lineHeight: 1,
              padding: '2px 4px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F4F2ED'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244, 242, 237, 0.4)'; }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Dossier body */}
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
          {/* Classified stamp */}
          <div className="classified-bar" style={{ marginBottom: '32px' }}>
            CLASSIFIED — INTERNAL PROFILE
          </div>

          {/* Title */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '8px',
              }}
            >
              System Profile
            </div>
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 6vw, 52px)',
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                lineHeight: 0.95,
              }}
            >
              SAEED
            </h2>
          </div>

          {/* Horizontal rule */}
          <div className="hr-accent" style={{ marginBottom: '28px' }} />

          {/* Profile data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {profileData.map((item, index) => (
              <div
                key={item.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '16px',
                  padding: '14px 0',
                  borderBottom: index < profileData.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    paddingTop: '2px',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: item.highlight ? 'Bricolage Grotesque, sans-serif' : 'Inter, sans-serif',
                    fontSize: item.highlight ? '13px' : '13px',
                    fontWeight: item.highlight ? 700 : 400,
                    color: item.highlight ? 'var(--accent)' : 'var(--text)',
                    letterSpacing: item.highlight ? '0.1em' : '0',
                    textTransform: item.highlight ? 'uppercase' : 'none',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom classified stamp */}
          <div style={{ marginTop: '32px' }}>
            <div className="hr-accent" style={{ marginBottom: '20px' }} />
            <div className="classified-bar" style={{ justifyContent: 'center' }}>
              END OF FILE — DO NOT DISTRIBUTE
            </div>
          </div>

          {/* Redaction note */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '16px',
              opacity: 0.5,
            }}
          >
            You found this because you were looking carefully. That matters.
          </p>
        </div>
      </div>
    </div>
  );
}
