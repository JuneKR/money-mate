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
import GoalBasedSavingPlan from './models/goalBasedSavingPlanModel';
import GoalBasedTransaction from './models/goalBasedTransactionModel';
import SavingRetirementPlan from './models/savingRetirementPlanModel';
import RetirementTransaction from './models/retirementTransactionModel';
import User from './models/userModel';

/* Junction Table */
import PortfolioPackage from './models/Portfolio Management/portfolioPackageModel';
import PackageItem from './models/Portfolio Management/PackageItem';
import MutualFund from './models/Portfolio Management/mutualFundModel';

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
/* User has one emergency plan */ 
User.hasOne(SavingEmergencyPlan, {
    foreignKey: {
        name: 'User_ID'
    }
})

SavingEmergencyPlan.belongsTo(User, {
    foreignKey: 'User_ID'
})

User.hasMany(GoalBasedSavingPlan, {
    foreignKey: {
        name: 'User_ID'
    }
})

GoalBasedSavingPlan.belongsTo(User, {
    foreignKey: 'User_ID'
})

User.hasOne(SavingRetirementPlan, {
    foreignKey: {
        name: 'User_ID'
    }
})

SavingRetirementPlan.belongsTo(User, {
    foreignKey: 'User_ID'
})

/* Emergency Plan has many transaction */
SavingEmergencyPlan.hasMany(EmergencyTransaction, {
    foreignKey: { 
        name: 'Emergency_ID'
    }
})

EmergencyTransaction.belongsTo(SavingEmergencyPlan, {
    foreignKey: 'Emergency_ID'
});

/* Goal-Based Plan has many transaction */
GoalBasedSavingPlan.hasMany(GoalBasedTransaction, {
    foreignKey: { 
        name: 'Goal_ID'
    }
})

GoalBasedTransaction.belongsTo(GoalBasedSavingPlan, {
    foreignKey: 'Goal_ID'
});

/* Retirement Plan has many transaction */
SavingRetirementPlan.hasMany(RetirementTransaction, {
    foreignKey: { 
        name: 'Retirement_ID'
    }
})

RetirementTransaction.belongsTo(SavingRetirementPlan, {
    foreignKey: 'Retirement_ID'
});

/* Portfolio Package Item */
// Package Item
PackageItem.belongsTo(PortfolioPackage, {
    foreignKey: 'Package_ID', targetKey: 'Package_ID'
})
PackageItem.belongsTo(MutualFund, {
    foreignKey: 'Fund_ID', targetKey: 'Fund_ID'
})

PortfolioPackage.belongsToMany(MutualFund, {
    foreignKey: 'Package_ID',
    through: PackageItem
})

MutualFund.belongsToMany(PortfolioPackage, {
    foreignKey: { 
        name: 'Package_ID'
    }, through: PackageItem
})

/* ------ */


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