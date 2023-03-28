import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/database';

interface PackageItemAttributes {
    PackageItem_ID: number;
    Package_ID: number;
    Fund_ID: number;   
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
    AllocationRatio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
})

export default PackageItem;