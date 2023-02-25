import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface UserAttributes {
    User_ID: number,
    FirstName: string,
    LastName: string,
    DateOfBirth: Date,
    Gender: string,
    RiskLevel: number,
    Email: string,
    Password: string,
    UserRegisteredDate: Date
}

interface UserCreationAttributes
    extends Optional<UserAttributes, 'User_ID'> {}

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
        id: string;
        createdAt?: Date;
        updatedAt?: Date;
    }

    const User = db.define<UserInstance>('UserProfile', {
        User_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        LastName: {
            type: DataTypes.STRING,
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
        Gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        RiskLevel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        UserRegisteredDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true
    })
    
    export default User;