import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';
// import Users from './UserModel';

interface RetirementAttributes {
    Retirement_ID: number;
    PlanName: string;
    TargetAmount: number;
    TimePeriod: number;
    InitialSaving: number;
    MonthlySaving: number;
    StartDate: Date;
    LastUpdate: Date;
    TotalBalance: number;
    TimeRemaining: number;
    DateOfBirth: Date;
    InterestRate: number;
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
    DateOfBirth: {
        type: DataTypes.DATEONLY,
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
    AgeToRetire: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    AgeToLive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    InflationRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    AdditionalInvestment: {
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
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    freezeTableName: true
})

// SavingRetirementPlan.belongsTo(User, {
//     foreignKey: 'User_ID'
// })

export default SavingRetirementPlan;