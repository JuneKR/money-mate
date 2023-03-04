import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface PackageAttributes {
    Package_ID: number;   
    PackageName: string;
    LastUpdate: Date;
    // StartDate: Date;
    RiskLevel: number;
    InvestmentType: string;
    EstimatedReturnRate: number;
}

interface PackageCreationAttributes
    extends Optional<PackageAttributes, 'Package_ID'> {}

interface PackageInstance
    extends Model<PackageAttributes, PackageCreationAttributes>,
    PackageAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const PortfolioPackage = db.define<PackageInstance>('PackagePortfolio', {
    Package_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PackageName: {
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
    RiskLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    InvestmentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    EstimatedReturnRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
})

export default PortfolioPackage;