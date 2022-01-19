const fs = require('fs').promises;

export async function readFile(fileName) {
  const filePath = `../../data/${filePath}`;
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

// readFile(fileName);
