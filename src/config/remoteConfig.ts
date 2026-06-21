// JSONBin.io — global section visibility sync
// Setup:
//   1. Create a free account at https://jsonbin.io
//   2. Click "Create Bin" → paste {"sections":{}} → Save
//   3. Fill in BIN_ID (from the URL) and API_KEY (from your account header)
export const JSONBIN_BIN_ID = '';
export const JSONBIN_API_KEY = '';

export const REMOTE_ENABLED = JSONBIN_BIN_ID.length > 0 && JSONBIN_API_KEY.length > 0;

const READ_URL = () => `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`;
const WRITE_URL = () => `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

export async function fetchRemoteSections(): Promise<Record<string, boolean> | null> {
  if (!REMOTE_ENABLED) return null;
  try {
    const r = await fetch(READ_URL(), {
      headers: { 'X-Master-Key': JSONBIN_API_KEY },
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return null;
    const j = await r.json();
    const sections = j?.record?.sections;
    if (sections && typeof sections === 'object') return sections as Record<string, boolean>;
    return null;
  } catch {
    return null;
  }
}

export async function publishRemoteSections(sections: Record<string, boolean>): Promise<boolean> {
  if (!REMOTE_ENABLED) return false;
  try {
    const r = await fetch(WRITE_URL(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
      body: JSON.stringify({ sections }),
      signal: AbortSignal.timeout(6000),
    });
    return r.ok;
  } catch {
    return false;
  }
}
