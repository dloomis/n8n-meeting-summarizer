# N8N Meeting Summarizer

An automated n8n workflow that processes meeting transcripts from MacWhisper, generates AI-powered structured notes in Obsidian (using Claude and Qwen models), supports three operation modes (meeting summaries, evergreen concept notes, and focused topic deep-dives triggered by filename markers), integrates with Obsidian vaults for knowledge management, and includes QuickAdd scripts for Kanban board task management.

## Features

- **Webhook Trigger**: Receives transcription data via webhook from MacWhisper
- **Text Extraction**: Processes plain text transcripts with speaker labels (double newlines separate speakers)
- **Participant Parsing**: Extracts participant names from transcript text and optional '!' filename delimiter (e.g., `meeting!Alice,Bob`) for summary prioritization. The '!' marker is optional and only needed when you want to override automatic participant detection.
- **AI Summarization**: Leverages Claude and Qwen models for intelligent analysis
- **Obsidian Output**: Generates formatted markdown with YAML frontmatter, participants, action items, and hot takes
- **Three Modes of Operation**: Automatically switches between meeting summaries, evergreen notes, and focused topic deep-dives based on filename markers
- **Evergreen Notes**: Optional '#' in filename triggers concept-based note generation from transcripts
- **Focused Topic Notes**: Optional '+' in filename triggers deep-dive analysis of specific technical topics from transcripts
- **GitHub Integration**: Fetches customizable system prompts from this repository

## Prerequisites

- Docker and Docker Compose
- MacWhisper Pro (for webhook integration)
- API keys for:
  - GitHub (for fetching system prompts)
  - Anthropic (Claude models)
  - OpenAI (Qwen models)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dloomis/n8n-meeting-summarizer.git
   cd n8n-meeting-summarizer
   ```

2. **Configure paths**: Edit `compose.yml` to replace `/path/to/your/obsidian/vault/Meeting Summaries`, `/path/to/your/obsidian/vault/Evergreen Notes`, and `/path/to/your/obsidian/vault/Focused Notes` with your actual local paths. Note: The file includes `N8N_RESTRICT_FILE_ACCESS_TO` for n8n v2 compatibility, restricting file access to these mapped paths for security

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
       - "Fetch Summary Prompt" node: GitHub API credential
       - "Fetch Evergreen Prompt" node: GitHub API credential
       - "Fetch Focused Topic Prompt" node: GitHub API credential
       - "Claude Sonnet 4.5" node: Anthropic API credential
       - "qwen/qwen3-30b-a3b-" node: OpenAI API credential
       - "Claude Opus 4.5" node: Anthropic API credential
       - "Claude Haiku 4.5" node: Anthropic API credential
       - "llama 3.3 70b instruct" node: OpenAI API credential

7. **Configure MacWhisper**:
    - In MacWhisper Settings > Integrations > n8n, paste the webhook URL from the Webhook node (e.g., `http://localhost:5678/webhook/macwhisper-transcript`)

## Modes of Operation

The workflow supports three modes based on the filename:

- **Meeting Summary Mode** (default): Generates structured meeting summaries with TL;DR, key points, action items, and hot takes
- **Evergreen Notes Mode**: Triggered by '#' in the filename, generates concept-based notes that capture insights and themes
- **Focused Topic Mode**: Triggered by '+' in the filename, generates deep-dive technical analysis of specific topics from the transcript

Filename arguments are optional but cannot be combined:
- `'!'` followed by comma-separated participant names (e.g., `meeting!Alice,Bob`) for prioritization in summaries
- `'#'` followed by a concept (e.g., `meeting#productivity`) to switch to evergreen mode
- `'+'` followed by a topic (e.g., `meeting+Docker containers`) to switch to focused topic mode

**Note**: Use only one marker per filename. The workflow defaults to meeting summary mode when no markers are present.

## Usage

1. **Transcribe and send**:
   - Use MacWhisper to transcribe audio files
   - Use the Quick Export button to send the transcript in .txt format via the configured n8n integration
   - The workflow receives the JSON payload via webhook with title and transcript (speaker blocks separated by double newlines)
   - Optionally include '!' for participants, '#' for evergreen mode, or '+' for focused topic mode in the filename (all markers are optional)

2. **Monitor output**: Check your Obsidian vault's Meeting Summaries folder for summaries, Evergreen Notes folder for concept-based notes, and Focused Notes folder for deep-dive analyses

## File Formats

- **Input**: JSON webhook payload with `{"title": "meeting title", "transcript": "plain text with speaker blocks separated by double newlines (e.g., 'Richard\nHello...\n\nPeter\nResponse...')"}`
- **Output**: Obsidian markdown with frontmatter, sections for TL;DR, key points, action items, and hot takes with Dataview inline fields for querying

## Obsidian Vault Integration

The workflow generates meeting summaries, Evergreen Notes, and Focused Topic Notes from transcripts, integrating with your Obsidian vault for structured knowledge management. Meeting summaries include Dataview inline fields for querying, while Evergreen Notes capture concepts and Focused Notes provide deep technical dives.

- **Hot Takes Querying**: Use Dataview to filter quotes by speaker across all meeting summaries.
- **People Notes**: Structured templates with sections for notes, hot takes, and meetings, populated via Dataview.
- **Evergreen Notes**: Concept-based notes extracted from transcripts (triggered by '#' in filename), stored in the Evergreen Notes folder with backlinks to meetings.
- **Focused Topic Notes**: Deep-dive technical analysis of specific topics (triggered by '+' in filename), stored in the Focused Notes folder for detailed learning.
- **CSS Hiding**: Inline fields are hidden in preview mode via a custom CSS snippet for clean viewing.
- **Kanban Boards**: Use the optional QuickAdd script to automatically add action items from meeting summaries to your Kanban boards for task management.

## Customization

- **System Prompt**: Edit `summary-system-prompt.md` and push to update the behavior for meeting summaries
- **Evergreen Prompt**: Edit `evergreen-system-prompt.md` and push to customize how Evergreen Notes are generated from transcripts
- **Focused Topic Prompt**: Edit `focused-system-prompt.md` and push to customize how Focused Topic Notes are generated from transcripts
- **Evergreen Notes**: The workflow detects Evergreen Notes when the title contains '#' followed by a concept (e.g., `meeting#productivity`). It routes the transcript to AI for concept-based note generation instead of a meeting summary, outputting to the Evergreen Notes folder. This is useful for capturing insights, ideas, or themes from discussions.
- **Focused Topic Notes**: The workflow detects Focused Notes when the title contains '+' followed by a topic (e.g., `meeting+Docker containers`). It routes the transcript to AI for deep-dive technical analysis of that specific topic, outputting to the Focused Notes folder. This is useful for detailed learning on technical concepts discussed in meetings.
- **GitHub Repo URL**: If you fork this repo, update the URL in the "Fetch System Prompt" and "Fetch Evergreen Prompt" nodes to point to your fork (e.g., `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/system-prompt.md`)
- **Important Participants**: The workflow automatically extracts participant names from the title after '!' (comma-separated) and uses them for prioritization. If no names are specified, it falls back to a default list. You can override this in the "Workflow Data" node by editing the `importantParticipants` array.
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
- **n8n v2 Local File Restrictions**: If using n8n version 2.x, local file operations are restricted for security. The included `compose.yml` configures `N8N_RESTRICT_FILE_ACCESS_TO` to allow access only to the mapped `/data` paths. If issues persist, enable "Allow file access" in n8n settings under Security > File System Access, or use cloud storage integrations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

MIT License - see LICENSE file for details