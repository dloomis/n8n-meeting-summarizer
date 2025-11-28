# AGENTS.md

## Build/Lint/Test Commands
- **Start n8n**: `docker-compose up`
- **Validate workflow**: Import `Meeting Summarizer.json` into n8n UI and check for errors
- **Test workflow**: Place transcription file in `/data/tmp` and monitor `/data/summaries`
- **Debug single execution**: Use n8n UI to manually trigger with test data

## Code Style Guidelines
- **JavaScript (Code Nodes)**: ES6+ syntax, single quotes, 4-space indent, minimal comments, JSDoc types, validate inputs
- **Markdown Formatting**: YAML frontmatter with 3 dashes, `YYYY-MM-DD` dates, participants `- "[[People/Name|Name]]"`, action items with owner/requestor, quotes `> Quote - [[People/Speaker|Speaker]]`, mandatory line breaks
- **Naming**: Files kebab-case, nodes descriptive, variables camelCase, people `[[People/Name|Name]]`
- **Error Handling**: Return unchanged on invalid data, try/catch, validate null/undefined, no API keys in code</content>
<parameter name="filePath">AGENTS.md