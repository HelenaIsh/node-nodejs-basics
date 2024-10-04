import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileDirectory = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const stream = createReadStream(fileDirectory);

    const hash = createHash('sha256');

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(fileHash);
    });
};

await calculateHash();