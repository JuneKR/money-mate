import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface RetirementAttributes {
    Retirement_ID: number;
    PlanName: string;
    TargetAmount: number;
    TimePeriod: number;
    MonthlySaving: number;
    StartDate: Date;
    LastUpdate: Date;
    TotalBalance: number;
    TimeRemaining: number;
    DateOfBirth: Date;
    MonthlyExpense: number;
    AgeToRetire: number;
    AgeToLive: number;
    InflationRate: number;
    AdditionalInvestment: number;
    Progression: number;
    User_ID: number;
}

interface RetirementCreationAttributes
    extends Optional<RetirementAttributes, 'Retirement_ID'> {}

interface RetirementInstance
    extends Model<RetirementAttributes, RetirementCreationAttributes>,
    RetirementAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const SavingRetirementPlan = db.define<RetirementInstance>('SavingRetirementPlan', {
    Retirement_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PlanName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 50]
        }
    },
    TargetAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    TimePeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    MonthlySaving: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    LastUpdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    TotalBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    TimeRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    DateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    MonthlyExpense: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    AgeToRetire: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    AgeToLive: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    InflationRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    AdditionalInvestment: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Progression: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true
})

export default SavingRetirementPlan;