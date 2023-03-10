import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';
// import Users from './UserModel';

interface TransactionAttributes {
    Transaction_ID: number;
    TransactionDate: Date;
    Amount: number;
    Type: string;
    Emergency_ID: number;
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

const EmergencyTransaction = db.define<TransactionInstance>('EmergencyTransaction', {
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
    Emergency_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    freezeTableName: true
})

export default EmergencyTransaction;