import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../../config/database';

interface PortfolioAttributes {
    Portfolio_ID: number;   
    PortfolioName: string;
    TotalValue: number;
    LastUpdate: Date;
    StartDate: Date;
    RiskSpectrum: number;
    ReturnRate: number;
    User_ID: number;
    Package_ID:number;
    Emergency_ID: number;
    Goal_ID: number;
    Retirement_ID: number;
}

interface PortfolioCreationAttributes
    extends Optional<PortfolioAttributes, 'Portfolio_ID'> {}

interface PortfolioInstance
    extends Model<PortfolioAttributes, PortfolioCreationAttributes>,
    PortfolioAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const InvestmentPortfolio = db.define<PortfolioInstance>('InvestmentPortfolio', {
    Portfolio_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PortfolioName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    TotalValue: {
        type: DataTypes.FLOAT,
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
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    RiskSpectrum: {
        type: DataTypes.INTEGER,
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
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Package_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Emergency_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Goal_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Retirement_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true
})

export default InvestmentPortfolio;