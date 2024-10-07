import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerDirectory = join(__dirname, 'worker.js');

const performCalculations = async () => {
    const numCores = cpus().length;
    const workers = [];
    const results = [];

    const createWorkerPromise = (index) => {
        return new Promise((resolve) => {
            const worker = new Worker(workerDirectory);

            worker.postMessage(10 + index);

            worker.on('message', (message) => {
                results[index] = message;
                resolve();
            });

            workers.push(worker);
        });
    };

    const promises = [];
    for (let i = 0; i < numCores; i++) {
        promises.push(createWorkerPromise(i));
    }

    await Promise.all(promises);

    console.log(results);

    workers.forEach(worker => worker.terminate());
};

await performCalculations();