# Frutiger Aero Arcade — GitHub Pages Edition

Static arcade hub that runs 100% on GitHub Pages. Games are saved **in the repo files** under `/roms/`.

![Frutiger Aero](assets/background.jpg)

### Features
- ✅ Fixed Frutiger Aero background (your image)
- ✅ 3 little dudes living on the grass — no boxes, they jump around and talk to each other (purple, blue, green guys you uploaded)
- ✅ Grid + Wii-style Carousel view
- ✅ Custom cover art per game
- ✅ Games loaded from `/roms/manifest.json` — stays saved in GitHub
- ✅ Works as `username.github.io/repo-name`

### How to deploy to GitHub Pages (.io website)

1. **Create a new GitHub repo** — e.g. `frutiger-arcade`

2. **Upload all files** from this folder to the repo root:
   ```
   index.html
   assets/background.jpg
   assets/dude-purple.png
   assets/dude-blue.png
   assets/dude-green.png
   roms/manifest.json
   roms/README.md
   .nojekyll
   README.md
   ```

3. **Enable Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / root
   - Save — your site will be at `https://YOURUSERNAME.github.io/frutiger-arcade/`

4. **Add your own ROMs** (legal only — your own dumps):
   - Put ROM file in `roms/` — e.g. `roms/Super Mario World.sfc`
   - (Optional) Put cover in `roms/covers/` — e.g. `roms/covers/Super Mario World.jpg`
   - Edit `roms/manifest.json`:

```json
[
  {
    "id": "smw",
    "name": "Super Mario World",
    "file": "roms/Super Mario World.sfc",
    "cover": "roms/covers/Super Mario World.jpg",
    "ext": "sfc",
    "core": "snes",
    "size": 524288,
    "added": 1725060000000
  }
]
```

   - `core` values: `nes`, `snes`, `gba`, `gb`, `gbc`, `segaMD`, `n64`, `nds`
   - `git add roms/ && git commit -m "add game" && git push`
   - Site auto-rebuilds with your game

### Folder structure for .io site
```
/
├── index.html
├── assets/
│   ├── background.jpg (your frutiger aero bg)
│   ├── dude-purple.png
│   ├── dude-blue.png
│   └── dude-green.png
├── roms/
│   ├── manifest.json (list of games)
│   ├── YourGame.gba
│   ├── AnotherGame.nes
│   └── covers/
│       ├── YourGame.jpg
│       └── AnotherGame.png
├── .nojekyll
└── README.md
```

### Dudes
The 3 dudes live in `#dudes-layer` fixed at bottom, no boxes. They have physics:
- Random walk, jump with gravity
- Shadows that shrink when jumping
- Speech bubbles with random phrases
- Click them to make them jump + talk

Replace images in `assets/dude-*.png` with your own to change them.

### Legal
Only use ROMs you dumped yourself from cartridges you physically own. This template does not include any copyrighted ROMs.

### Local test
Just open `index.html` or run `npx serve .` — no server needed. EmulatorJS loads from CDN.

For the old Node sync server version, check git history — this version is static for GitHub Pages.
