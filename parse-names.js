/**
 * Parses person names from a filename after an optional '!' character.
 * Extracts comma-separated names until '#' or end of filename.
 * @param {string} filename - The filename to parse
 * @returns {string[]} Array of trimmed person names
 */
function parsePersonNames(filename) {
    const bangIndex = filename.indexOf('!');
    if (bangIndex === -1) {
        return [];
    }

    let namePart = '';
    for (let i = bangIndex + 1; i < filename.length; i++) {
        if (filename[i] === '#') {
            break;
        }
        namePart += filename[i];
    }

    return namePart.split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);
}

// Example usage:
// console.log(parsePersonNames('meeting!Alice,Bob.mp3')); // ['Alice', 'Bob']
// console.log(parsePersonNames('meeting.mp3')); // []
// console.log(parsePersonNames('meeting!Alice,Bob#.txt')); // ['Alice', 'Bob']