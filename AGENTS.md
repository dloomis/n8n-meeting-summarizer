# AGENTS.md

## Build/Lint/Test Commands
- **Start n8n**: `docker-compose up`
- **Validate workflow**: Import `Meeting Summarizer.json` into n8n UI and check for connection errors
- **Test workflow**: Place transcription file in `/data/tmp` and monitor `/data/summaries` for output
- **Debug single execution**: Use n8n UI to manually trigger workflow with test data

## Code Style Guidelines

### JavaScript (Code Nodes)
- ES6+ syntax: arrow functions, destructuring, template literals
- Single quotes, 4-space indentation, minimal comments
- Use `const`/`let` appropriately, return early from functions
- No imports needed - n8n utilities available globally
- Types: Use JSDoc for complex objects, validate inputs

### Markdown Formatting (Critical)
- YAML frontmatter: Exactly 3 dashes (`---`) with no trailing spaces
- Date fields: `YYYY-MM-DD` format or empty (never "Unknown"/"N/A")
- Participants: YAML list with quoted double-brackets: `- "[[Label]]"`
- Action items: `- [ ] Description **Owner:** (owner:: [[Name]]) **Requestor:** (requestor:: [[Name]]) 📅 YYYY-MM-DD`
- Quotes: Use `>` for hot takes, attribute with `- [[Speaker]]`
- Line breaks: Mandatory after headers, list items, table rows

### Naming Conventions
- Files: kebab-case (e.g., `system-prompt-transcription.md`)
- Node names: Descriptive titles in n8n workflow
- Variables: camelCase in JavaScript
- Person names: Always wrapped in `[[Double Brackets]]`

### Error Handling & Security
- Return unchanged items if invalid data in code nodes
- Use try/catch where appropriate, validate null/undefined
- Never commit API keys - use n8n credential management
- Validate file paths and inputs</content>
<parameter name="filePath">/Users/dloomis/Documents/Projects/n8n-meeting-summarizer/AGENTS.md