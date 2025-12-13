# AGENTS.md

## Build/Lint/Test Commands
- **Start n8n**: `docker-compose up`
- **Stop n8n**: `docker-compose down`
- **Setup credentials**: Create GitHub API, Anthropic API, and OpenAI API credentials in n8n UI
- **Validate workflow**: Import `Meeting Summarizer.json` into n8n UI, assign credentials, and check for errors
- **Test full workflow**: Place transcription file in `/data/tmp` and monitor `/data/summaries`
- **Test single execution**: Use n8n UI to manually trigger workflow with test data
- **Debug logs**: `docker-compose logs n8n`

## Code Style Guidelines
- **JavaScript (Code Nodes)**: ES6+ syntax, single quotes, 4-space indent, minimal comments, JSDoc types, validate inputs, no console.log
- **Markdown Formatting**: YAML frontmatter with 3 dashes, `YYYY-MM-DD` dates, participants `- "[[People/Name|Name]]"`, action items with owner/requestor, quotes `> Quote - [[People/Speaker|Speaker]]`, mandatory line breaks
- **Naming**: Files kebab-case, nodes descriptive, variables camelCase, people `[[People/Name|Name]]`, constants UPPER_CASE
- **Error Handling**: Return unchanged on invalid data, try/catch blocks, validate null/undefined, no API keys in code
- **Imports**: Use ES6 imports, group by type (built-in, external, local), no unused imports
- **Types**: Use JSDoc for type hints in JS, prefer explicit types over implicit
- **Security**: Never log or commit secrets, validate all inputs, sanitize data</content>
<parameter name="filePath">AGENTS.md