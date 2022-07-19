module.exports = {
    apps: [{
      name: 'Goodlife-Admin-Dev',
      script: './server.js',
      instances: 1,
      autorestart: true,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    }]
  };
  
  