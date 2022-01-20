function createApp(config) {
  const logFile = `${__dirname}/logs/${config.name}.log`

  return {
    instances: 1,
    autorestart: false,
    log_date_format: 'HH:mm:ss',
    vizion: false,
    error_file: logFile,
    out_file: logFile,
    ...config,
  }
}

module.exports = {
  apps: [
    createApp({
      name: 'build-api',
      cwd: 'api',
      script: 'npm run watch',
      watch: ['./tsconfig.json', '../tsconfig.json'],
    }),

    createApp({
      name: 'api',
      cwd: 'api',
      script: 'npm run dev',
      watch: ['./dist/src'],
      env: {
        NODE_ENV: 'development',
      },
    }),

    createApp({
      name: 'codegen-api',
      cwd: 'api',
      script: 'npm run codegen -- --watch',
      watch: ['codegen.yml'],
    }),

    createApp({ name: 'app', cwd: 'app', script: 'npm run start' }),

    createApp({
      name: 'codegen-app',
      cwd: 'app',
      script: 'npm run codegen -- --watch',
      watch: ['codegen.yml'],
    }),
  ],
}
