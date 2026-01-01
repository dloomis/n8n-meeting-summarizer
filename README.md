# N8N Meeting Summarizer

An automated n8n workflow that processes .whisper files exported from MacWhisper (containing compressed JSON transcription data and audio files), generates AI-powered structured notes in Obsidian (using Claude and Qwen models), supports audio timestamp linking in summaries, and handles three operation modes (meeting summaries, evergreen concept notes, and focused topic deep-dives triggered by filename markers). Integrates with Obsidian vaults for knowledge management and includes QuickAdd scripts for Kanban board task management.

## Features

- **File-Based Trigger**: Processes .whisper files exported from MacWhisper to `/data/tmp`
- **Archive Extraction**: Unzips .whisper files to extract JSON transcription data and audio files
- **Audio File Handling**: Saves audio files to Obsidian vault with dynamic naming for timestamp linking
- **Audio Timestamp Linking**: Generates summaries with Obsidian audio links (e.g., `[[meeting.m4a#t=MM:SS|(audio)]]`) for playback during review
- **JSON Parsing**: Extracts transcription data, participants, timestamps, and metadata from included JSON
- **Participant Parsing**: Extracts participant names from transcript and optional '!' filename delimiter (e.g., `meeting!Alice,Bob`) for summary prioritization
- **AI Summarization**: Leverages Claude and Qwen models for intelligent analysis
- **Obsidian Output**: Generates formatted markdown with YAML frontmatter, participants, action items, hot takes, and audio links
- **Three Modes of Operation**: Automatically switches between meeting summaries, evergreen notes, and focused topic deep-dives based on filename markers
- **Evergreen Notes**: Optional '#' in filename triggers concept-based note generation from transcripts
- **Focused Topic Notes**: Optional '+' in filename triggers deep-dive analysis of specific topics from transcripts
- **GitHub Integration**: Fetches customizable system prompts from this repository

## Prerequisites

- Docker and Docker Compose
- MacWhisper Pro (for .whisper file exports)
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

2. **Configure paths**: Edit `compose.yml` to replace `/path/to/your/obsidian/vault/Meeting Summaries`, `/path/to/your/obsidian/vault/Evergreen Notes`, `/path/to/your/obsidian/vault/Focused Notes`, and `/path/to/your/obsidian/vault/audio` with your actual local paths. The audio path mounts to an "audio" subfolder in your vault for file indexing. Note: The file includes `N8N_RESTRICT_FILE_ACCESS_TO` for n8n v2 compatibility, restricting file access to these mapped paths for security

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
    - Export .whisper files from MacWhisper to `/Users/dloomis/tmp` (or your configured `/data/tmp` path). The workflow monitors this directory for new .whisper files.

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

1. **Transcribe and export**:
   - Use MacWhisper to transcribe audio files
   - Export the result as a .whisper file to `/Users/dloomis/tmp` (or your configured `/data/tmp` path)
   - The workflow automatically detects new .whisper files, extracts the JSON transcription data and audio file, and processes them
   - Optionally include '!' for participants, '#' for evergreen mode, or '+' for focused topic mode in the .whisper filename (all markers are optional)

2. **Monitor output**: Check your Obsidian vault's Meeting Summaries folder for summaries with audio links, Evergreen Notes folder for concept-based notes, and Focused Notes folder for deep-dive analyses. Audio files are saved to the vault's audio subfolder for linking.

## File Formats

- **Input**: .whisper file (ZIP archive containing `metadata.json` with transcription data, timestamps, speakers, and an audio file like .m4a)
- **Output**: Obsidian markdown with frontmatter, sections for TL;DR, key points, action items, hot takes, and audio timestamp links (e.g., `[[meeting.m4a#t=MM:SS|(audio)]]`) with Dataview inline fields for querying

## Obsidian Vault Integration

The workflow generates meeting summaries, Evergreen Notes, and Focused Topic Notes from .whisper files, integrating with your Obsidian vault for structured knowledge management. Summaries include audio timestamp links for playback, Dataview inline fields for querying, while Evergreen Notes capture concepts and Focused Notes provide deep technical dives.

- **Audio Timestamp Linking**: Click audio links in summaries (e.g., `[[meeting.m4a#t=MM:SS|(audio)]]`) to jump to specific moments in the recording using Obsidian's audio player.
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

- `meeting_with_peter.d815dc.md`: Example meeting summary output with audio links
- `meeting_with_peter#business plan.md`: Example evergreen note output
- `meeting_with_peter.d815dc.m4a`: Example audio file for timestamp linking
- `meeting_with_peter.txt`: Example transcription text file

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