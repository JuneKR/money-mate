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
    Password: string
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
            // defaultValue: DataTypes.UUIDV4,
            autoIncrement: true,
            // allowNull: false,
            // validate: {
            //     notEmpty: true
            // }
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        DateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 6]
            }
        },
        RiskLevel: {
            type: DataTypes.STRING,
            allowNull: true,
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
    }, {
        freezeTableName: true
    })
    
    export default User;