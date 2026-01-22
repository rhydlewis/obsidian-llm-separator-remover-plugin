# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LLM Separator Remover is a focused Obsidian plugin that removes LLM-generated separator patterns (`\n---\n`) from notes. The plugin is intentionally simple with no settings or configuration.

## Build and Development Commands

### Development workflow
```bash
npm run dev          # Start esbuild in watch mode (auto-recompiles on changes)
npm run build        # Type-check with tsc and build production bundle
npm run lint         # Run ESLint with Obsidian-specific rules
```

### Version management
```bash
npm version patch    # Bump patch version (updates manifest.json, package.json, versions.json)
npm version minor    # Bump minor version
npm version major    # Bump major version
```

**Note:** Before running `npm version`, manually update `minAppVersion` in `manifest.json` if the minimum Obsidian version requirement changes.

### Installation requirements
- NodeJS v16 or higher
- Dependencies: Run `npm i` before development

## Code Architecture

### Single-file implementation
- **src/main.ts**: Complete plugin implementation
  - `LLMSeparatorRemoverPlugin extends Plugin`
  - `onload()`: Registers the single command
  - `removeSeparators()`: Core logic that removes `\n---\n` patterns

### No settings
This plugin intentionally has no settings. The pattern `\n---\n` is hardcoded following YAGNI principles.

### Build system
- **esbuild.config.mjs**: ESBuild bundler configuration
  - Entry: `src/main.ts` → Output: `main.js`
  - Development mode: watch + inline sourcemaps
  - Production mode: minified, no sourcemaps
  - External: Obsidian API, Electron, CodeMirror packages are not bundled

### Core functionality
The plugin uses a simple regex pattern `/\n---\n/g` to find and remove separators. It:
1. Counts matches before removal (for user feedback)
2. Replaces all instances with a single newline
3. Shows a notification with the count
4. Preserves legitimate markdown horizontal rules (no blank lines around them)

## Development workflow

1. Place plugin folder in `.obsidian/plugins/llm-separator-remover/` of test vault
2. Run `npm run dev` to start watch mode
3. Make changes to `src/main.ts`
4. Reload Obsidian to see changes (Ctrl/Cmd+R or disable/enable plugin)
5. Test by creating a note with `\n---\n` patterns and running the command

## Testing

Create test notes with:
- Multiple `\n---\n` patterns (should be removed)
- Legitimate `---` markdown (should be preserved)
- Empty notes (should show "No separators found")
- Verify undo/redo works correctly

## Release process

Required files for GitHub release:
1. `manifest.json` (both in repo root AND uploaded to release)
2. `main.js` (compiled plugin bundle)

`versions.json` maps plugin versions to minimum Obsidian versions for backwards compatibility.
