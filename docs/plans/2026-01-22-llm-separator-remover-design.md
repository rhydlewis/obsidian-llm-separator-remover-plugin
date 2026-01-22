# LLM Separator Remover Plugin - Design Document

**Date:** 2026-01-22
**Status:** Approved

## Overview

A focused Obsidian plugin that removes LLM-generated separator patterns from notes. The plugin removes the specific pattern `\n---\n` (blank line + three hyphens + blank line) from the current active note.

## Core Functionality

### Purpose
Remove LLM-generated separator text that often appears in AI-generated content when pasted into Obsidian notes.

### Pattern to Remove
- Exact pattern: `\n---\n`
- This preserves legitimate markdown horizontal rules (which are just `---` on a line without surrounding blank lines)

### Scope
- Works on the entire content of the current active note
- One note at a time (no batch processing)
- Changes are reversible via Obsidian's built-in undo (Ctrl/Cmd+Z)

## User Interaction

### Invocation Methods
1. **Command Palette:** "Remove LLM separators"
2. **Keyboard Shortcut:** User-configurable in Obsidian settings
3. **Editor Context Menu:** Right-click option in editor

### Feedback
- Success: "Removed X separator(s)" notification showing count
- No matches: "No separators found" notification
- Command only appears when markdown editor is active

## Technical Implementation

### Pattern Matching
- Use JavaScript regex: `/\n---\n/g`
- Count occurrences before replacement for user feedback
- Single-pass global replacement

### Editor Integration
```typescript
const content = editor.getValue();
const count = (content.match(/\n---\n/g) || []).length;
const newContent = content.replace(/\n---\n/g, '\n');
editor.setValue(newContent);
```

### Code Structure
- **main.ts:** Single plugin class with removal command
- **No settings.ts needed:** Pattern is hardcoded
- **No modal needed:** Direct action with notification

### Plugin Metadata
- ID: `llm-separator-remover`
- Name: "LLM Separator Remover"
- Description: "Remove LLM-generated separator patterns (blank line + --- + blank line) from notes"
- Platform: Desktop + Mobile compatible

## Edge Cases

### Handled
1. No active editor: Command unavailable (using `checkCallback`)
2. Legitimate markdown separators: Preserved (requires blank lines to match)
3. Multiple consecutive separators: All removed in one pass
4. Empty note: Shows "No separators found"

### Cursor Position
Preserved when possible after operation.

## What We're NOT Building (YAGNI)

- No settings panel
- No preview/confirmation dialog
- No batch processing
- No statistics or logging
- No custom pattern support
- No ribbon icon

## Testing Strategy

1. Note with multiple `\n---\n` patterns → All removed
2. Note with legitimate `---` markdown → Preserved
3. Empty note → "No separators found"
4. Undo/redo → Works correctly

## Implementation Checklist

- [ ] Update manifest.json with plugin metadata
- [ ] Remove sample code from main.ts
- [ ] Implement removal command with editor callback
- [ ] Add command to palette and context menu
- [ ] Add user feedback notifications
- [ ] Test all edge cases
- [ ] Update README.md with plugin description
