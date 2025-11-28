# N8N Meeting Summarizer

An automated workflow using n8n to summarize meeting transcripts into structured Obsidian-compatible notes.

## Features

- **File Trigger**: Monitors `/data/tmp` for new transcription files
- **Text Extraction**: Processes text files with speaker labels
- **AI Summarization**: Uses Claude Sonnet 4.5 and Qwen models for analysis
- **Obsidian Output**: Generates formatted markdown with YAML frontmatter, participants, action items, and hot takes
- **GitHub Integration**: Fetches system prompts from this repository

## Prerequisites

- Docker and Docker Compose
- n8n account (optional, runs locally)
- API keys for:
  - GitHub (for fetching system prompts)
  - Anthropic (Claude Sonnet 4.5)
  - OpenAI (Qwen models)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dloomis/n8n-meeting-summarizer.git
   cd n8n-meeting-summarizer
   ```

2. **Start n8n**:
   ```bash
   docker-compose up
   ```

3. **Access n8n UI** at `http://localhost:5678`

4. **Create credentials** in n8n UI:
   - **GitHub API**: Create a personal access token with repo read access
   - **Anthropic API**: Get API key from Anthropic
   - **OpenAI API**: Get API key from OpenAI

5. **Import workflow**:
   - In n8n UI, go to Workflows > Import from File
   - Select `Meeting Summarizer.json`
   - Assign the created credentials to the respective nodes

6. **Configure paths** (if needed):
   - Ensure `/data/tmp` and `/data/summaries` are accessible
   - The workflow expects transcription files in the format with speaker names on separate lines

## Usage

1. **Prepare transcription**: Use MacWhisper to transcribe audio files, then format as text with speaker labels (see `meeting_with_peter.txt` for example)
2. **Place file**: Copy the transcription file to your local tmp directory (mounted as `/data/tmp` in the container)
3. **Monitor output**: Check your Obsidian vault's Meeting Summaries folder for generated summaries

## File Formats

- **Input**: Plain text with speaker names followed by dialogue (e.g., `Richard\nHello...\nPeter\nResponse...`)
- **Output**: Obsidian markdown with frontmatter, sections for TL;DR, key points, action items, hot takes

## Customization

- **System Prompt**: Edit `system-prompt.md` and push to update the workflow's behavior
- **GitHub Repo URL**: If you fork this repo, update the URL in the "Fetch System Prompt" node to point to your fork (e.g., `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/system-prompt.md`)
- **Workflow**: Modify `Meeting Summarizer.json` in n8n UI for advanced changes
- **Models**: Adjust temperature or switch models in the workflow nodes

## Sample Files

- `meeting_with_peter.txt`: Example transcription input
- `meeting_with_peter.mp3`: Sample audio file
- `meeting_with_peter.442.md`: Example summary output

## Security Notes

- Credentials are not included in the workflow JSON for security
- Never commit real API keys to the repository
- The workflow fetches the system prompt from this GitHub repo

## Troubleshooting

- Ensure Docker volumes are correctly mounted
- Check n8n logs: `docker-compose logs n8n`
- Verify credential assignments in workflow nodes
- Test with the provided sample files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

MIT License - see LICENSE file for details