function randomMoves() {
    const fs = require('fs');
    const path = require('path');
    
    // Function to recursively find files in subdirectories
    function findFiles(directory) {
        let files = [];
    
        // Get list of files and directories in the current directory
        const items = fs.readdirSync(directory);
    
        // Iterate through each item
        items.forEach(item => {
            // Construct full path of the item
            const fullPath = path.join(directory, item);
    
            // Check if the item is a directory
            if (fs.statSync(fullPath).isDirectory()) {
                // Recursively find files in the subdirectory
                files = files.concat(findFiles(fullPath));
            } else {
                // If the item is a file, add it to the list
                files.push(fullPath);
            }
        });
    
        return files;
    }
    
    // Define the parent directory
    const parentDirectory = 'C:\\Users\\Owner\\Documents\\GitHub\\fantasy\\src\\data';
    
    // Find all files in the parent directory and its subdirectories
    const allFiles = findFiles(parentDirectory);
    
    // Generate a random index within the range of allFiles array length starting from index 3
    const minIndex = 3;
    const maxIndex = allFiles.length - 1; // Subtract 1 because arrays are zero-indexed
    const randomIndex = minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
    
    // Select a random file from the list using the random index
    const selectedFile = allFiles[randomIndex];
    
    const fileParts = selectedFile.split('\\');
    
    // Access the second-to-last item in the array
    const secondLastItem = fileParts[fileParts.length - 2];
    
    return { secondLastItem, selectedFile };
}

console.log(randomMoves())
