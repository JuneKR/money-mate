import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface TransactionAttributes {
    Transaction_ID: number;
    TransactionDate: Date;
    PolicyDesc: string;
    FundAbbrName: string;
    Amount: number;
    Type: string;
    Portfolio_ID: number;
}

interface TransactionCreationAttributes
    extends Optional<TransactionAttributes, 'Transaction_ID'> {}

interface TransactionInstance
    extends Model<TransactionAttributes, TransactionCreationAttributes>,
    TransactionAttributes {
      id: number;
      createdAt?: Date;
      updatedAt?: Date;
    }

const InvestmentTransaction = db.define<TransactionInstance>('InvestmentTransaction', {
    Transaction_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    TransactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
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
    Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 10]
        }
    },
    Portfolio_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    freezeTableName: true
})

export default InvestmentTransaction;