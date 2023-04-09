import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface GoalBasedAttributes {
    Goal_ID: number;
    PlanName: string;
    TargetAmount: number;
    TimePeriod: number;
    MonthlySaving: number;
    StartDate: Date;
    LastUpdate: Date;
    TotalBalance: number;
    TimeRemaining: number;
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

export default GoalBasedSavingPlan;