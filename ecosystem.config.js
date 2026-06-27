module.exports = {
    apps: [
        {
            name: 'studs-life-web',
            cwd: './',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            env: {
                PORT: 3000,
                NODE_ENV: 'production',
            },
        },
        {
            name: 'studs-life-cms',
            cwd: './studs-life-cms',
            script: 'npm',
            args: 'run start',
            env: {
                PORT: 1337,
                NODE_ENV: 'production',
            },
        },
    ],
};
