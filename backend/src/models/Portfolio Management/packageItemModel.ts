import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface PackageItemAttributes {
    PackageItem_ID: number;
    Package_ID: number;
    Fund_ID: number;   
    PolicyDesc: string;
    FundAbbrName: string;
    OneYearReturns: number;
    AllocationRatio: number;
}

interface PackageItemCreationAttributes
    extends Optional<PackageItemAttributes, 'PackageItem_ID'>{}

interface PackageItemInstance
    extends Model<PackageItemAttributes, PackageItemCreationAttributes>,
    PackageItemAttributes {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
    }

const PackageItem = db.define<PackageItemInstance>('PackageItem', {
    PackageItem_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Package_ID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'PortfolioPackage',
            key: 'Package_ID'
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

export default PackageItem;