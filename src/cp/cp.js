import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scriptDirectory = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [scriptDirectory, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);
};

spawnChildProcess(['arg1', 'arg2']);
