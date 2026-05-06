# AGENTS.md

## Project
Kids reading practice web app. See `SPEC.md` for full requirements.

## Setup Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Production: `npm start`
- Test: `npm test`

## Code Style
- Vanilla JavaScript (no TypeScript, no frameworks)
- Use `const`/`let`, never `var`
- Async/await over Promise chains
- 2-space indentation
- Single quotes for strings
- Semicolons required
- camelCase for variables, kebab-case for filenames

## Project Structure
- `server.js` — Express backend entry point
- `public/` — Static frontend files
- `data/` — JSON word banks (do not modify without approval)
- `data/blocklist.json` — Always filter words against this

## Testing Instructions
- Run `npm test` before committing
- Manually verify in Chrome and Firefox
- Test on 1920×1080 minimum viewport
- Confirm Web Speech API works (click any word)

## Safety Rules (Critical)
- This app is for children ages 5-8
- Always filter API responses through `data/blocklist.json`
- Never add external links, ads, or tracking
- Never request microphone/camera without explicit toggle
- Sanitize all displayed text (prevent XSS)

## Do Not
- Add new dependencies without asking
- Refactor existing code without asking
- Add features not in `SPEC.md` without asking
- Use frameworks (React, Vue, etc.)
- Add a database (JSON files only for MVP)
- Add authentication or user accounts

## Pull Request / Commit Guidelines
- Atomic commits (one logical change per commit)
- Format: `<type>: <description>` (e.g., `feat: add word scatter logic`)
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## When Stuck
- Reference `SPEC.md` as source of truth
- Ask clarifying questions instead of guessing
- Provide 2-3 options with trade-offs

## Current Phase
Phase 1: Project setup (see `SPEC.md` for phase roadmap)