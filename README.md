# N8N Meeting Summarizer

An automated workflow using n8n that either summarizes meeting transcripts into structured Obsidian-compatible notes or generates evergreen notes on specific concepts based on filename markers.

## Features

- **Webhook Trigger**: Receives transcription data via webhook from MacWhisper
- **Text Extraction**: Processes plain text transcripts with speaker labels (double newlines separate speakers)
- **Participant Parsing**: Extracts participant names from transcript text and filenames using '!' delimiter (e.g., `meeting!Alice,Bob`) for summary prioritization
- **AI Summarization**: Uses Claude Sonnet 4.5 and Qwen models for analysis
- **Obsidian Output**: Generates formatted markdown with YAML frontmatter, participants, action items, and hot takes
- **Evergreen Notes Processing**: Automatically detects and processes transcripts into Evergreen Notes using workflow logic (titles with '#' trigger note generation)
- **GitHub Integration**: Fetches system prompts from this repository

## Prerequisites

- Docker and Docker Compose
- n8n account (optional, runs locally)
- MacWhisper Pro (for webhook integration)
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

2. **Configure paths**: Edit `compose.yml` to replace `/path/to/your/obsidian/vault/Meeting Summaries`, and `/path/to/your/obsidian/vault/Evergreen Notes` with your actual local paths

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
    - **Important**: The workflow JSON has been stripped of all credential configurations and instance-specific IDs for security and portability. After import, you must manually assign credentials to each node as follows:
      - "Fetch Prompt" node: GitHub API credential
      - "Claude Sonnet 4.5" node: Anthropic API credential
      - "qwen/qwen3-30b-a3b-" node: OpenAI API credential
      - "Claude Opus 4.5" node: Anthropic API credential
      - "Claude Haiku 4.5" node: Anthropic API credential
      - "llama 3.3 70b instruct" node: OpenAI API credential

7. **Configure MacWhisper**:
    - In MacWhisper Settings > Integrations > n8n, paste the webhook URL from the Webhook node (e.g., `http://localhost:5678/webhook/macwhisper-transcript`)

## Usage

1. **Transcribe and send**: Use MacWhisper to transcribe audio files, then use the Quick Export button to send the transcript in .txt format via the previously defined n8n Integration. The workflow automatically receives the JSON payload via webhook with title and plain text transcript (speaker blocks separated by double newlines). Optionally, include '!' in the title followed by comma-separated participant names (e.g., `meeting!Alice,Bob`) for prioritization. Include '#' followed by a concept (e.g., `meeting!Alice,Bob#productivity`) to generate an Evergreen Note.
2. **Monitor output**: Check your Obsidian vault's Meeting Summaries folder for summaries and Evergreen Notes folder for concept-based notes

## File Formats

- **Input**: JSON webhook payload with `{"title": "meeting title", "transcript": "plain text with speaker blocks separated by double newlines (e.g., 'Richard\nHello...\n\nPeter\nResponse...')"}`
- **Output**: Obsidian markdown with frontmatter, sections for TL;DR, key points, action items, and hot takes with Dataview inline fields for querying

## Obsidian Vault Integration

The workflow generates both meeting summaries and Evergreen Notes from transcripts, integrating with your Obsidian vault for structured knowledge management. Meeting summaries include Dataview inline fields for querying, while Evergreen Notes capture concepts with links to related meetings.

- **Hot Takes Querying**: Use Dataview to filter quotes by speaker across all meeting summaries.
- **People Notes**: Structured templates with sections for notes, hot takes, and meetings, populated via Dataview.
- **Evergreen Notes**: Concept-based notes extracted from transcripts (triggered by '#' in filename), stored in the Evergreen Notes folder with backlinks to meetings.
- **CSS Hiding**: Inline fields are hidden in preview mode via a custom CSS snippet for clean viewing.
- **Kanban Boards**: Use the optional QuickAdd script to automatically add action items from meeting summaries to your Kanban boards for task management.

## Customization

- **System Prompt**: Edit `system-prompt.md` and push to update the behavior for meeting summaries (when generating meeting summaries)
- **Evergreen Prompt**: Edit `evergreen-prompt.md` and push to customize how Evergreen Notes are generated from transcripts
- **Evergreen Notes**: The workflow detects Evergreen Notes when the title contains '#' followed by a concept (e.g., `meeting#productivity`). It routes the transcript to AI for concept-based note generation instead of a meeting summary, outputting to the Evergreen Notes folder. This is useful for capturing insights, ideas, or themes from discussions.
- **GitHub Repo URL**: If you fork this repo, update the URL in the "Fetch System Prompt" and "Fetch Evergreen Prompt" nodes to point to your fork (e.g., `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/system-prompt.md`)
- **Important Participants**: The workflow automatically extracts participant names from the title after '!' (comma-separated) and uses them for prioritization. If no names are specified, it falls back to a default list. You can override this in the "Store file info" node by editing the `importantParticipants` array.
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
- `meeting_with_peter#business plan.md`: Example evergreen note output

## Security Notes

- Credentials are not included in the workflow JSON for security
- Never commit real API keys to the repository
- The workflow fetches the system prompt from this GitHub repo (updated regularly; clone the repo if you want to customize without changes being overwritten)

## Troubleshooting

- Ensure Docker volumes are correctly mounted
- Check n8n logs: `docker-compose logs n8n`
- Verify credential assignments in workflow nodes
- Verify MacWhisper webhook URL is correctly configured
- Test webhook manually with sample JSON payload (e.g., via curl)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

MIT License - see LICENSE file for details