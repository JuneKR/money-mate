import { Sequelize } from "sequelize";

const db = new Sequelize('money_mate_db_test', 'root', '', {
    host:"localhost",
    dialect: "mysql",
})

export default db;