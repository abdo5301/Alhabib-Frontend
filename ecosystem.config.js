module.exports = {
  apps: [
    {
      name: 'frontend.alhabibshop.com',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
      // script: './start.js',
      // env: {
      //   HOST: 'localhost',
      //   PORT: 3000
      // }
    }
  ]
}
