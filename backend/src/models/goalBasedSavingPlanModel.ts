import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';
// import Users from './UserModel';

interface GoalBasedAttributes {
    Goal_ID: number;
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
    Progression: number;
    User_ID: number;
}

interface GoalBasedCreationAttributes
    extends Optional<GoalBasedAttributes, 'Goal_ID'> {}

interface GoalBasedInstance
    extends Model<GoalBasedAttributes, GoalBasedCreationAttributes>,
    GoalBasedAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const GoalBasedSavingPlan = db.define<GoalBasedInstance>('GoalBasedSavingPlan', {
    Goal_ID: {
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

export default GoalBasedSavingPlan;