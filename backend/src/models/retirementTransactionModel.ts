import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface TransactionAttributes {
    Transaction_ID: number;
    TransactionDate: Date;
    Amount: number;
    Type: string;
    Retirement_ID: number;
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

const RetirementTransaction = db.define<TransactionInstance>('RetirementTransaction', {
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
    Retirement_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    freezeTableName: true
})

export default RetirementTransaction;