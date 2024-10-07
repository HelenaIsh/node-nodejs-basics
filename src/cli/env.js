const parseEnv = () => {
    const rssEnvVars = Object.keys(process.env)
    .filter((key) => key.startsWith('RSS_'))
    .map((key) => `${key}=${process.env[key]}`);

    console.log(rssEnvVars.join('; '));
};

parseEnv();