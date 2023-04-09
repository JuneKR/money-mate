import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../../config/database';

interface PortfolioItemAttributes {
    PortfolioItem_ID: number;
    Portfolio_ID: number;
    Fund_ID: number;
    PolicyDesc: string;
    FundAbbrName: string;
    OneYearReturns: number;   
    AllocationRatio: number;
}

interface PortfolioItemCreationAttributes
    extends Optional<PortfolioItemAttributes, 'PortfolioItem_ID'>{}

interface PortfolioItemInstance
    extends Model<PortfolioItemAttributes, PortfolioItemCreationAttributes>,
    PortfolioItemAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const PortfolioItem = db.define<PortfolioItemInstance>('PortfolioItem', {
    PortfolioItem_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Portfolio_ID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'InvestmentPortfolio',
            key: 'Portfolio_ID'
        }
    },
    Fund_ID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'MutualFund',
            key: 'Fund_ID'
        }
    },
    PolicyDesc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FundAbbrName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    OneYearReturns: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    AllocationRatio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    freezeTableName: true
})

export default PortfolioItem;