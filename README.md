# AI Kids World — Prototype 2 (Bright 3D EdTech skin)

Second visual prototype. Same React architecture, `USER_DATA` config, games,
waitlist logic and drone as prototype 1 — only the design system changed.

```bash
npm install
npm run dev   # http://localhost:5174
```

## Book cover slot

The hero shows a floating 3D book with a placeholder cover. To use the real
cover art, drop a PNG at:

```
prototype-2/public/book-cover.png
```

It replaces the placeholder automatically on next load. Delete the file to
fall back. Path/alt text are configured in `src/data/userData.js` →
`hero.bookCover`.

## Character image slots

The "Meet the Characters" section shows three cards with emoji placeholders.
Drop character art at:

```
prototype-2/public/characters/byte.png
prototype-2/public/characters/character-2.png
prototype-2/public/characters/character-3.png
```

Names, roles, descriptions and image paths are configured in
`src/data/userData.js` → `characters.cast`.

## Byte the drone

`src/components/DroneBot.jsx` is a byte-for-byte copy of prototype 1 — the
orange cyber drone is a book character and must NOT be restyled to match
the light theme.
