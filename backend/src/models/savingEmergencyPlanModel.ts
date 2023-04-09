import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface EmergencyAttributes {
    Emergency_ID: number;
    PlanName: string;
    TargetAmount: number;
    TimePeriod: number;
    MonthlySaving: number;
    StartDate: Date;
    LastUpdate: Date;
    TotalBalance: number;
    TimeRemaining: number;
    MonthlyExpense: number;
    Progression: number;
    User_ID: number;
}

interface EmergencyCreationAttributes
    extends Optional<EmergencyAttributes, 'Emergency_ID'> {}

interface EmergencyInstance
    extends Model<EmergencyAttributes, EmergencyCreationAttributes>,
    EmergencyAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const SavingEmergencyPlan = db.define<EmergencyInstance>('SavingEmergencyPlan', {
    Emergency_ID: {
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
    MonthlyExpense: {
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


export default SavingEmergencyPlan;