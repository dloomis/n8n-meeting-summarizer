# AGENTS.md

## Build/Lint/Test Commands

This is an n8n workflow project. No traditional build/lint/test commands exist.

- **Start n8n**: `docker-compose up`
- **Validate workflow**: Import `Meeting Summarizer.json` into n8n UI
- **Test workflow**: Place transcription file in `/data/tmp` and monitor `/data/summaries`

## Code Style Guidelines

### JavaScript (Code Nodes)
- Use modern ES6+ syntax (arrow functions, destructuring, template literals)
- Single quotes for strings
- 4-space indentation
- Minimal comments - code should be self-documenting
- Use `const`/`let` appropriately
- Return early from functions

### Markdown Formatting (Critical)
- **YAML frontmatter**: Exactly 3 dashes (`---`) with no trailing spaces
- **Date fields**: `YYYY-MM-DD` format or empty (never "Unknown"/"N/A")
- **Participants**: YAML list format with quoted double-brackets: `- "[[Label]]"`
- **Action items**: Strict order: `- [ ] Description **Owner:** (owner:: [[Name]]) **Requestor:** (requestor:: [[Name]]) 📅 YYYY-MM-DD`
- **Quotes**: Use `>` for hot takes, attribute with `- [[Speaker]]`
- **Line breaks**: Mandatory after headers, list items, table rows

### Naming Conventions
- **Files**: kebab-case (e.g., `system-prompt-transcription.md`)
- **Node names**: Descriptive titles in n8n workflow
- **Variables**: camelCase in JavaScript
- **Person names**: Always wrapped in `[[Double Brackets]]`

### Error Handling
- JavaScript code nodes: Return unchanged items if invalid data
- Workflow: Use try/catch in code nodes where appropriate
- Validation: Check for null/undefined before processing

### Security
- Never commit API keys or credentials
- Use n8n credential management for API access
- Validate file paths and inputs</content>
<parameter name="filePath">/Users/dloomis/Documents/Projects/n8n-meeting-summarizer/AGENTS.md