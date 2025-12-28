module.exports = async (params) => {
    const { app } = params;

    // Get active file
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("No active file");
        return;
    }

    // Get selected text
    const editor = app.workspace.activeEditor?.editor;
    if (!editor) {
        new Notice("No active editor");
        return;
    }

    const selectedText = editor.getSelection();
    if (!selectedText.trim()) {
        new Notice("No text selected");
        return;
    }

    // Parse the selected text
    // Format: (optional - [ ]) Description 🎯 (action-owner:: [[Name]]) 🗣️ (action-requestor:: [[Name]]) 📅 YYYY-MM-DD 🔺
    const regex = /^\s*(- \[ \] )?(.+?) 🎯 \(action-owner:: \[\[(.+?)\]\]\) 🗣️ \(action-requestor:: \[\[(.+?)\]\]\) 📅 (\d{4}-\d{2}-\d{2}) (.+)/;
    const match = selectedText.match(regex);
    if (!match) {
        new Notice("Selected text does not match expected action item format");
        return;
    }

    const description = match[2].trim();
    const owner = match[3];
    const requestor = match[4];
    const due = match[5];
    const priorityEmoji = match[6].trim();

    // Map priority emojis to text
    const priorityMap = {
        '🔺': 'Highest',
        '⏫': 'High',
        '🔼': 'Medium',
        '🔽': 'Low',
        '⏬': 'Lowest'
    };
    const priority = priorityMap[priorityEmoji] || 'No priority';

    // Format the card
    const card = `- [ ] ${description}\n  **Owner:** [[${owner}]]\n  **Requestor:** [[${requestor}]]\n  **Due:** ${due}\n  **Priority:** ${priority}\n  **Source:** [[${activeFile.basename}]]\n\n`;

    // Read Kanban.md
    const kanbanPath = '00 Kanban.md';
    const kanbanFile = app.vault.getAbstractFileByPath(kanbanPath);
    if (!kanbanFile) {
        new Notice("Kanban file not found at " + kanbanPath);
        return;
    }

    const content = await app.vault.read(kanbanFile);

    // Find the Backlog section
    const backlogIndex = content.indexOf('## Backlog');
    if (backlogIndex === -1) {
        new Notice("Backlog section not found in Kanban file");
        return;
    }

    // Find the end of Backlog (next ## section or end of file)
    const nextSectionMatch = content.slice(backlogIndex + 1).match(/\n## /);
    const insertPos = nextSectionMatch ? backlogIndex + 1 + nextSectionMatch.index : content.length;

    // Insert the card before the next section
    const newContent = content.slice(0, insertPos) + '\n' + card + content.slice(insertPos);

    // Write back to file
    await app.vault.modify(kanbanFile, newContent);

    new Notice("Card added to Kanban Backlog");
};