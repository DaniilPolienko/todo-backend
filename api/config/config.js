require('dotenv').config();

module.exports = {
  development: {
    datebase: 'todo-dev',
    use_env_variables: 'DB_DEV_URL',
    dialect: 'postgres'
  },
  test: {
    datebase: 'todo-test',
    use_env_variables: 'DB_TEST_URL',
    dialect: 'postgres'
  },
  production: {
    datebase: 'todo-prod',
    use_env_variables: 'DB_PROD_URL',
    dialect: 'postgres'
  }
};