require("dotenv").config();

module.exports = {
  development: {
    database: "todolist",
    use_env_variables: "DB_DEV_URL",
    dialect: "postgres"
  }, 
   test: {
    database: "testtodolist",
    use_env_variables: "DB_TEST_URL",
    dialect: "postgres"
  },
  production: {
    database: "prodtodolist",
    use_env_variables: "DB_PROD_URL",
    dialect: "postgres"
  },

}