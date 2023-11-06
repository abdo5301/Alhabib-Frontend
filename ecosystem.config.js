module.exports = {
  apps: [
    {
      name: 'front.test.alhabibshop.com',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
