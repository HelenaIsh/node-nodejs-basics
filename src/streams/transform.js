import { Transform } from 'stream';

const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
        const reversedChunk = chunk.toString().split('').reverse().join('') + '\n';
        callback(null, reversedChunk);
    }
});

const transform = async () => {
    process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();