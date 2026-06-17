import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OutputLine = {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
};

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '┌─ Available Commands ──────────────────────────',
    '│  help       — show this message',
    '│  whoami     — display user profile',
    '│  skills     — list technical capabilities',
    '│  projects   — browse selected work',
    '│  contact    — get contact information',
    '│  coffee     — essential fuel',
    '│  clear      — clear terminal output',
    '└───────────────────────────────────────────────',
  ],
  whoami: () => [
    '',
    '  NAME    Saeed',
    '  ROLE    Designer · Builder · Problem Solver',
    '  EXP     16+ years',
    '  BASE    Independent Studio',
    '  MODE    Systems Thinking',
    '',
    '  "I design trust. Not templates."',
    '',
  ],
  skills: () => [
    '',
    '  ▸ Pharmaceutical Packaging Design   ████████████ Master',
    '  ▸ Brand Identity Systems            ████████████ Master',
    '  ▸ Product Packaging                 ████████████ Master',
    '  ▸ Catalog & Brochure Design         ███████████░ Expert',
    '  ▸ UI/UX Design                      ██████████░░ Expert',
    '  ▸ WordPress Development             █████████░░░ Advanced',
    '  ▸ AI Integration                    ████████░░░░ Advanced',
    '  ▸ Telegram Bots                     ████████░░░░ Advanced',
    '  ▸ Business Automation               ███████░░░░░ Proficient',
    '',
  ],
  projects: () => [
    '',
    '  001  Pharmaceutical Packaging Series    2023',
    '  002  Luxury Wellness Brand Identity     2022',
    '  003  Editorial Product Catalog          2022',
    '  004  Corporate Identity System          2021',
    '  005  Healthcare Digital Platform        2023',
    '',
    '  → Scroll up in the archive to examine each project.',
    '',
  ],
  contact: () => [
    '',
    '  EMAIL      hello@saeed.design',
    '  PHONE      +98 912 000 0000',
    '  LINKEDIN   /in/saeed-designer',
    '',
    '  Preferred contact: Email',
    '  Response time:     < 24 hours',
    '',
  ],
  coffee: () => [
    '',
    '  ☕  Loading caffeine...',
    '',
    '  ██████████████████████████████ 100%',
    '',
    '  Design quality    +25%',
    '  Attention to detail  +40%',
    '  Font kerning sensitivity  +60%',
    '  Tolerance for bad briefs  -15%',
    '',
    '  ✓ Ready to design.',
    '',
  ],
};

const BOOT_LINES = [
  'SAEED DESIGN SYSTEM v1.0',
  'Initializing workspace...',
  '──────────────────────────────────────────',
  'Type "help" for available commands.',
  '',
];

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Boot sequence
  useEffect(() => {
    if (isOpen && !booted) {
      setHistory([]);
      let delay = 0;
      BOOT_LINES.forEach((line, i) => {
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: 'system', content: line },
          ]);
        }, delay);
        delay += i === 0 ? 300 : 120;
      });
      setTimeout(() => {
        setBooted(true);
        inputRef.current?.focus();
      }, delay + 100);
    }
    if (!isOpen) {
      setBooted(false);
      setHistory([]);
      setInput('');
    }
  }, [isOpen, booted]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Add input line to history
    const newHistory: OutputLine[] = [
      ...history,
      { type: 'input', content: cmd },
    ];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const lines = handler();
      lines.forEach((line) => {
        newHistory.push({ type: 'output', content: line });
      });
    } else {
      newHistory.push({
        type: 'error',
        content: `  Command not found: "${cmd}". Type "help" for available commands.`,
      });
    }

    setHistory(newHistory);
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex]);
    }
  };

  const getLineStyle = (type: string) => {
    const base = {
      fontFamily: 'SF Mono, Fira Code, Monaco, monospace',
      fontSize: '12px',
      lineHeight: '1.7',
      whiteSpace: 'pre' as const,
    };
    switch (type) {
      case 'input':
        return { ...base, color: '#F4F2ED' };
      case 'output':
        return { ...base, color: 'rgba(244, 242, 237, 0.65)' };
      case 'error':
        return { ...base, color: '#FF7B7B' };
      case 'system':
        return { ...base, color: 'rgba(166, 134, 94, 0.8)' };
      default:
        return { ...base, color: 'rgba(244, 242, 237, 0.5)' };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        backgroundColor: 'rgba(10, 10, 9, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="terminal-window"
        style={{
          width: '100%',
          maxWidth: '680px',
          height: 'min(520px, 80vh)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal title bar */}
        <div className="terminal-bar" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Traffic light buttons */}
          <button
            onClick={onClose}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FF5F57',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Close terminal"
          />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FEBC2E', flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28C840', flexShrink: 0 }} />

          {/* Title */}
          <div style={{ flex: 1, textAlign: 'center', marginRight: '40px' }}>
            <span
              style={{
                fontFamily: 'SF Mono, Fira Code, monospace',
                fontSize: '11px',
                color: 'rgba(244, 242, 237, 0.35)',
                letterSpacing: '0.08em',
              }}
            >
              saeed-design-system — terminal
            </span>
          </div>
        </div>

        {/* Output area */}
        <div
          ref={outputRef}
          className="terminal-output"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 20px 8px',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => (
            <div key={index} style={getLineStyle(line.type)}>
              {line.type === 'input' ? (
                <span>
                  <span style={{ color: 'var(--accent)' }}>{'> '}</span>
                  {line.content}
                </span>
              ) : (
                line.content
              )}
            </div>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          style={{
            borderTop: '1px solid rgba(244, 242, 237, 0.06)',
            padding: '12px 20px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '12px',
              color: 'var(--accent)',
              flexShrink: 0,
            }}
          >
            {'>'}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '12px',
              color: '#F4F2ED',
              letterSpacing: '0.02em',
              caretColor: 'var(--accent)',
            }}
          />
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              backgroundColor: 'var(--accent)',
              opacity: 0.7,
              verticalAlign: 'middle',
            }}
          />
        </form>
      </div>
    </div>
  );
}
