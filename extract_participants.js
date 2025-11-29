const fs = require('fs');

// Read the transcript file
const transcript = fs.readFileSync('meeting_with_peter.txt', 'utf8');

// Split by double newlines to get blocks (each starting with participant)
const blocks = transcript.split(/\n\n/).filter(block => block.trim());

// Extract unique participants from the first line of each block
const participants = [...new Set(blocks.map(block => block.split('\n')[0].trim()))];

// Output the unique list
console.log('Unique Participants:');
participants.forEach(participant => console.log(`- ${participant}`));