module.exports = {
  apps: [{
    name: "reactbdd",
    script: "npx",
    autorestart: true,
    error_file : "/data/pm2/reactbdd-err.log",
    out_file: "/data/pm2/reactbdd-out.log",
    log_date_format:"YYYY-MM-DD HH:mm Z",
    watch: false,
    interpreter: "none",
    args: "serve -s build -p 5000",
    env: {
      NODE_ENV: "development"
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_staging: {
      NODE_ENV: "staging",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
