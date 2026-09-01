# ROMs Folder — For GitHub Pages Persistence

This is where your games live. They are **saved in the repo files**, so they stay on your `.io` site.

### How to add a game (legal only — your own dumps):

1. **Dump your cartridge** you own with GBxCart / Retrode / etc.
2. **Copy the ROM file** into this folder: `/roms/`
   - Example: `roms/Super Mario World (USA).sfc`
   - Supported: `.nes .snes .smc .sfc .gba .gb .gbc .gen .md .bin .n64 .z64 .nds`

3. **(Optional) Add cover art**:
   - Put an image in `/roms/covers/` 
   - Example: `roms/covers/Super Mario World.jpg`
   - Recommended: 400x560 JPG/PNG

4. **Edit `manifest.json`** in this folder — add an entry:

```json
{
  "id": "mario-world-1",
  "name": "Super Mario World (USA)",
  "file": "roms/Super Mario World (USA).sfc",
  "cover": "roms/covers/Super Mario World.jpg",
  "ext": "sfc",
  "core": "snes",
  "size": 524288,
  "added": 1725060000000
}
```

Fields:
- `id`: unique, no spaces (use slug)
- `name`: display name
- `file`: path relative to repo root (must be inside roms/)
- `cover`: path to cover image or null
- `ext`: file extension without dot
- `core`: emulator core — `nes`, `snes`, `gba`, `gb`, `gbc`, `segaMD`, `n64`, `nds`
- `size`: file size in bytes (optional)
- `added`: timestamp Date.now()

5. **Push to GitHub**:
```bash
git add roms/
git commit -m "add mario world"
git push
```

Your site will rebuild and the game appears automatically.

### Auto-generate manifest

Run this locally to regenerate manifest from files in this folder:

```bash
node ../tools/generate-manifest.js
```

It scans `/roms/` and creates `manifest.json` for you.

### Legal
Only add ROMs you dumped yourself from cartridges you physically own. Do not add pirated ROMs.
