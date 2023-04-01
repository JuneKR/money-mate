import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface PackageAttributes {
    Package_ID: number;   
    PackageName: string;
    LastUpdate: Date;
    // StartDate: Date;
    RiskSpectrum: number;
    InvestmentType: string;
    ReturnRate: number;   
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

const PortfolioPackage = db.define<PackageInstance>('PortfolioPackage', {
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
    RiskSpectrum: {
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
    ReturnRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    freezeTableName: true
})


export default PortfolioPackage;