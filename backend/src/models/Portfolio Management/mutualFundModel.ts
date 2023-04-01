import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface FundAttributes {
    Fund_ID: number; 
    LastUpdate: Date;  
    FundName: string;
    FundAbbrName: string; 
    RiskSpectrum: number;
    PolicyDesc: string;
    SpecCode: string;
    SpecDesc: string;
    NAV: number;
    MinimumInvestmentAmount: number;
    MinimumAdditionalAmount: number;
    oneYearReturns: number;
    threeYearReturns: number;
    fiveYearReturns: number;
    YTDReturns: number;
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
    LastUpdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    FundName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 30]
        }
    },
    FundAbbrName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 10]
        }
    },
    RiskSpectrum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    PolicyDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 20]
        }
    },
    SpecCode: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 10]
        }
    },
    SpecDesc: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 20]
        }
    },
    NAV: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    MinimumInvestmentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    MinimumAdditionalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    oneYearReturns: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    threeYearReturns: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    fiveYearReturns: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    YTDReturns: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
})

export default MutualFund;