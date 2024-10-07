import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdin } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileDirectory = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const stream = createWriteStream(fileDirectory);

    stdin.pipe(stream);
};

await write();