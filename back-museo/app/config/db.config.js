module.exports = {
    HOST: "localhost",
    USER: "museo",
    PASSWORD: "museo123",
    DB: "museo-db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };