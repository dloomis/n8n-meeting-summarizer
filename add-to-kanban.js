module.exports = async (params) => {
  const { app, quickAddApi } = params;

  // Get the active file (current meeting summary note)
  const activeFile = app.workspace.getActiveFile();
  if (!activeFile) {
    quickAddApi.infoDialog("No active file found.");
    return;
  }

  // Read the content of the active file
  const content = await app.vault.read(activeFile);

  // Parse action items (lines starting with - [ ])
  const actionItems = content.match(/- \[ \] .*/g) || [];

  if (actionItems.length === 0) {
    quickAddApi.infoDialog("No unchecked action items found in the current note.");
    return;
  }

  // Find Kanban board files (files containing 'kanban' in name)
  const kanbanFiles = app.vault.getMarkdownFiles().filter(f =>
    f.name.toLowerCase().includes('kanban') || f.name.toLowerCase().includes('board')
  );

  if (kanbanFiles.length === 0) {
    quickAddApi.infoDialog("No Kanban board files found. Create a Kanban board first.");
    return;
  }

  // Let user choose which Kanban board
  const kanbanFile = await quickAddApi.suggester(
    kanbanFiles.map(f => f.basename),
    kanbanFiles
  );

  if (!kanbanFile) return;

  // Read the Kanban board content
  const kanbanContent = await app.vault.read(kanbanFile);

  // Find lanes (## headings)
  const lanes = kanbanContent.match(/^## .*/gm) || [];

  if (lanes.length === 0) {
    quickAddApi.infoDialog("No lanes found in the selected Kanban board.");
    return;
  }

  // Let user choose which lane to add to
  const lane = await quickAddApi.suggester(
    lanes.map(l => l.substring(3).trim()),
    lanes
  );

  if (!lane) return;

  // Find the position to insert new cards (after the lane heading, before next lane)
  const laneIndex = kanbanContent.indexOf(lane);
  const nextLaneMatch = kanbanContent.substring(laneIndex + lane.length).match(/^## /m);
  const insertPos = nextLaneMatch
    ? laneIndex + lane.length + nextLaneMatch.index
    : kanbanContent.length;

  // Format action items as Kanban cards (remove the - [ ] prefix)
  const cards = actionItems.map(item => '- ' + item.substring(6).trim()).join('\n');

  // Insert the cards
  const newContent = kanbanContent.substring(0, insertPos) +
                     '\n' + cards + '\n' +
                     kanbanContent.substring(insertPos);

  // Save the updated Kanban board
  await app.vault.modify(kanbanFile, newContent);

  quickAddApi.infoDialog(`Added ${actionItems.length} action items to "${lane.substring(3).trim()}" lane.`);
};