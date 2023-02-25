import { Sequelize } from "sequelize";

const db = new Sequelize('money_mate_db_test', 'root', 'mysql@Admin007', {
    host:"localhost",
    dialect: "mysql",
})

export default db;