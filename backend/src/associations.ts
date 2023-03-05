/* Models */
import SavingEmergencyPlan from './models/savingEmergencyPlanModel';
import EmergencyTransaction from './models/emergencyTransactionModel';
import GoalBasedSavingPlan from './models/goalBasedSavingPlanModel';
import GoalBasedTransaction from './models/goalBasedTransactionModel';
import SavingRetirementPlan from './models/savingRetirementPlanModel';
import RetirementTransaction from './models/retirementTransactionModel';
import User from './models/userModel';

/* Junction Table */
import PortfolioPackage from './models/Portfolio Management/portfolioPackageModel';
import PackageItem from './models/Portfolio Management/PackageItem';
import MutualFund from './models/Portfolio Management/mutualFundModel';

/* Model Association */
/* User has one emergency plan */ 
const setAssociations = function () {

    User.hasOne(SavingEmergencyPlan, {
        foreignKey: {
            name: 'User_ID'
        }
    })

    SavingEmergencyPlan.belongsTo(User, {
        foreignKey: 'User_ID'
    })

    User.hasMany(GoalBasedSavingPlan, {
        foreignKey: {
            name: 'User_ID'
        }
    })

    GoalBasedSavingPlan.belongsTo(User, {
        foreignKey: 'User_ID'
    })

    User.hasOne(SavingRetirementPlan, {
        foreignKey: {
            name: 'User_ID'
        }
    })

    SavingRetirementPlan.belongsTo(User, {
        foreignKey: 'User_ID'
    })

    /* Emergency Plan has many transaction */
    SavingEmergencyPlan.hasMany(EmergencyTransaction, {
        foreignKey: { 
            name: 'Emergency_ID'
        }
    })

    EmergencyTransaction.belongsTo(SavingEmergencyPlan, {
        foreignKey: 'Emergency_ID'
    });

    /* Goal-Based Plan has many transaction */
    GoalBasedSavingPlan.hasMany(GoalBasedTransaction, {
        foreignKey: { 
            name: 'Goal_ID'
        }
    })

    GoalBasedTransaction.belongsTo(GoalBasedSavingPlan, {
        foreignKey: 'Goal_ID'
    });

    /* Retirement Plan has many transaction */
    SavingRetirementPlan.hasMany(RetirementTransaction, {
        foreignKey: { 
            name: 'Retirement_ID'
        }
    })

    RetirementTransaction.belongsTo(SavingRetirementPlan, {
        foreignKey: 'Retirement_ID'
    });

    /* Portfolio Package Item */
    // Package Item
    PackageItem.belongsTo(PortfolioPackage, {
        foreignKey: 'Package_ID', targetKey: 'Package_ID'
    })
    PackageItem.belongsTo(MutualFund, {
        foreignKey: 'Fund_ID', targetKey: 'Fund_ID'
    })

    PortfolioPackage.belongsToMany(MutualFund, {
        foreignKey: 'Package_ID',
        through: PackageItem
    })

    MutualFund.belongsToMany(PortfolioPackage, {
        foreignKey: { 
            name: 'Package_ID'
        }, through: PackageItem
    })

}

export default setAssociations;
/* ------ */