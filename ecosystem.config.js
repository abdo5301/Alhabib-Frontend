module.exports = {
  apps: [
    {
      name: 'front.test.alhabibshop.com',
      // name: 'front.alhabibshop.com',
      // port: '3000',
      // exec_mode: 'cluster',
      // instances: 'max',
      // script: './.output/server/index.mjs'
      script: './start.js',
      env: {
        HOST: '127.0.0.1',
        PORT: 3000
      }
    }
  ]
}
