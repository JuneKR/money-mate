import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface FundAttributes {
    Fund_ID: number;   
    FundName: string;
    FundSymbol: string; 
    FundType: string;
    LastUpdate: Date;
    CostBasis: number;
    Nav: number;
    ReturnRate: number;
    ExpenseRatio: number;
    Description: string;
    // Risk Spectrum
}

interface FundCreationAttributes
    extends Optional<FundAttributes, 'Fund_ID'> {}

interface FundInstance
    extends Model<FundAttributes, FundCreationAttributes>,
    FundAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const MutualFund = db.define<FundInstance>('MutualFund', {
    Fund_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FundName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    FundSymbol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    FundType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
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
    CostBasis: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Nav: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ReturnRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ExpenseRatio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
}, {
    freezeTableName: true
})

export default MutualFund;