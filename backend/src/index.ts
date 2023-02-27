import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import session from "express-session";
import SequelizeStore from 'connect-session-sequelize';
import db from './config/database';

/* Routes */
import userRoute from './routes/userRoute';
import savingEmergencyPlanRoute from './routes/savingEmergencyPlanRoute';
import goalBasedSavingPlanRoute from './routes/goalBasedSavingPlanRoute';
import savingRetirementPlanRoute from './routes/savingRetirementPlanRoute';

/* Models */
import SavingEmergencyPlan from './models/savingEmergencyPlanModel';
import EmergencyTransaction from './models/emergencyTransactionModel';
import User from './models/userModel';

config();

const app: Application = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

/* Run MySQL Code! */ 
(async ()=> {
    await db.sync();
})();

const SECRET = process.env.SESS_SECRET

if(!SECRET) {
    throw new Error('Messing Session Secret!')
}

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, World!')
})

/* Model Association */
/*
User.hasOne(SavingEmergencyPlan, {
    foreignKey: {
        name: 'User_ID'
    }
})
SavingEmergencyPlan.belongsTo(User, {
    foreignKey: 'User_ID'
})
*/

/* Emergency Plan has many transaction */
SavingEmergencyPlan.hasMany(EmergencyTransaction, {
    foreignKey: { 
        name: 'Emergency_ID'
    }
})
EmergencyTransaction.belongsTo(SavingEmergencyPlan, {
    foreignKey: 'Emergency_ID'
});

/* destructure property of req.body */
app.use(express.json());
app.use(userRoute);
app.use(savingEmergencyPlanRoute);
app.use(goalBasedSavingPlanRoute);
app.use(savingRetirementPlanRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})