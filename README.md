# N8N Meeting Summarizer

An automated workflow using n8n to summarize meeting transcripts into structured Obsidian-compatible notes.

## Features

- **File Trigger**: Monitors `/data/tmp` for new transcription files
- **Text Extraction**: Processes text files with speaker labels
- **Participant Parsing**: Extracts participant names from filenames using '!' delimiter (e.g., `meeting!Alice,Bob.txt`) for summary prioritization
- **AI Summarization**: Uses Claude Sonnet 4.5 and Qwen models for analysis
- **Obsidian Output**: Generates formatted markdown with YAML frontmatter, participants, action items, and hot takes
- **Evergreen Notes Processing**: Automatically detects and processes transcripts into Evergreen Notes using workflow logic (files with '#' trigger note generation)
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

2. **Configure paths**: Edit `compose.yml` to replace `/path/to/your/tmp/directory`, `/path/to/your/obsidian/vault/Meeting Summaries`, and `/path/to/your/obsidian/vault/Evergreen Notes` with your actual local paths

3. **Start n8n**:
   ```bash
   docker-compose up
   ```

4. **Access n8n UI** at `http://localhost:5678`

5. **Create credentials** in n8n UI:
   - **GitHub API**: Create a personal access token with repo read access
   - **Anthropic API**: Get API key from Anthropic
   - **OpenAI API**: Get API key from OpenAI

6. **Import workflow**:
   - In n8n UI, go to Workflows > Import from File
   - Select `Meeting Summarizer.json`
   - Assign credentials to nodes:
     - "Fetch Summary Prompt" node: GitHub API credential
     - "Fetch Evergreen Prompt" node: GitHub API credential
     - "Claude Sonnet 4.5" node: Anthropic API credential
     - "qwen/qwen3-30b-a3b-2507" node: OpenAI API credential
     - "Claude Opus 4.5" node: Anthropic API credential

## Usage

1. **Prepare transcription**: Use MacWhisper to transcribe audio files, then format as text with speaker labels (see `meeting_with_peter.txt` for example). Optionally, include '!' in the filename followed by comma-separated participant names (e.g., `meeting!Alice,Bob.txt`) to specify participants for prioritization in the summary (if not specified, participants are extracted from the transcript). Also, include '#' followed by a concept (e.g., `meeting!Alice,Bob#productivity.txt`) to generate an Evergreen Note on that topic.
2. **Place file**: Copy the transcription file to your local tmp directory (mounted as `/data/tmp` in the container)
3. **Monitor output**: Check your Obsidian vault's Meeting Summaries folder for summaries and Evergreen Notes folder for concept-based notes

## File Formats

- **Input**: Plain text with speaker names followed by dialogue (e.g., `Richard\nHello...\nPeter\nResponse...`)
- **Output**: Obsidian markdown with frontmatter, sections for TL;DR, key points, action items, and hot takes with Dataview inline fields for querying

## Obsidian Vault Integration

The workflow generates both meeting summaries and Evergreen Notes from transcripts, integrating with your Obsidian vault for structured knowledge management. Meeting summaries include Dataview inline fields for querying, while Evergreen Notes capture concepts with links to related meetings.

- **Hot Takes Querying**: Use Dataview to filter quotes by speaker across all meeting summaries.
- **People Notes**: Structured templates with sections for notes, hot takes, and meetings, populated via Dataview.
- **Evergreen Notes**: Concept-based notes extracted from transcripts (triggered by '#' in filename), stored in the Evergreen Notes folder with backlinks to meetings.
- **CSS Hiding**: Inline fields are hidden in preview mode via a custom CSS snippet for clean viewing.
- **Kanban Boards**: Use the optional QuickAdd script to automatically add action items from meeting summaries to your Kanban boards for task management.

## Customization

- **System Prompt**: Edit `system-prompt.md` and push to update the workflow's behavior
- **GitHub Repo URL**: If you fork this repo, update the URL in the "Fetch System Prompt" node to point to your fork (e.g., `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/system-prompt.md`)
- **Important Participants**: The workflow automatically extracts participant names from the filename after '!' (comma-separated) and uses them for prioritization. If no names are specified, it falls back to a default list. You can override this in the "Store file info" node by editing the `importantParticipants` array.
- **Workflow**: Modify `Meeting Summarizer.json` in n8n UI for advanced changes
- **Models**: Adjust temperature or switch models in the workflow nodes
- **Obsidian Templates**: Customize the People Notes Template in your vault for different structures
- **Kanban Integration**: Use the optional `add-to-kanban.js` script with QuickAdd to add cards to the Kanban plugin based on action items from meeting summaries
  - **Prerequisites**: Install [QuickAdd](https://github.com/chhoumann/quickadd) and [Kanban](https://github.com/mgmeyers/obsidian-kanban) plugins in Obsidian
  - **Setup**: Download `add-to-kanban.js`, add it to QuickAdd's scripts folder, and configure a new QuickAdd choice to run the script
  - **Usage**: From a meeting summary note, trigger QuickAdd to execute the script, which parses action items and adds them as cards to your Kanban board

## Sample Files

- `meeting_with_peter.txt`: Example transcription input
- `meeting_with_peter.mp3`: Sample audio file
- `meeting_with_peter.442.md`: Example summary output
- `evergreen-prompt.md`: Template for Evergreen Notes generation

## Security Notes

- Credentials are not included in the workflow JSON for security
- Never commit real API keys to the repository
- The workflow fetches the system prompt from this GitHub repo (updated regularly; clone the repo if you want to customize without changes being overwritten)

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