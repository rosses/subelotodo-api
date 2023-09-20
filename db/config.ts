import { Sequelize } from "sequelize";
import { config } from 'dotenv';

config();
const db = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    // logging:false,
});

export default db;

export const sequelizeCliConfig = {
    development: {
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      host: process.env.DB_HOST!,
      dialect: 'mysql',
    },
    production: {
      // Configuración para producción (si es necesario)
    },
  };