import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileDirectory = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const stream = createReadStream(fileDirectory);

    stream.pipe(stdout);
};

await read();