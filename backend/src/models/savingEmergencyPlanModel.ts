import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface EmergencyAttributes {
    Emergency_ID: number;
    PlanName: string;
    TargetAmount: number;
    TimePeriod: number;
    InitialSaving: number;
    MonthlySaving: number;
    StartDate: Date;
    LastUpdate: Date;
    TotalBalance: number;
    TimeRemaining: number;
    InterestRate: number;
    MonthlyExpense: number;
    Progression: number;
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
            notEmpty: true,
            len: [3, 50]
        }
    },
    TargetAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    TimePeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    InitialSaving: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    MonthlySaving: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    LastUpdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    TotalBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    TimeRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    InterestRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 0
    },
    MonthlyExpense: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Progression: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 0
    },
}, {
    freezeTableName: true
})


export default SavingEmergencyPlan;