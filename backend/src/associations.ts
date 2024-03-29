import { Sequelize } from 'sequelize'

/* Models */
import SavingEmergencyPlan from './models/savingEmergencyPlanModel';
import EmergencyTransaction from './models/emergencyTransactionModel';
import GoalBasedSavingPlan from './models/goalBasedSavingPlanModel';
import GoalBasedTransaction from './models/goalBasedTransactionModel';
import SavingRetirementPlan from './models/savingRetirementPlanModel';
import RetirementTransaction from './models/retirementTransactionModel';
import User from './models/userModel';

/* Junction Table */
/* Portfolio Package */
import PortfolioPackage from './models/portfolio management/portfolioPackageModel';
import PackageItem from './models/portfolio management/packageItemModel';
import MutualFund from './models/portfolio management/mutualFundModel';

/* Portfolio Package */
import InvestmentPortfolio from './models/portfolio management/investment portfolio/investmentPortfolioModel';
import PortfolioItem from './models/portfolio management/investment portfolio/portfolioItemModel';

/* Model Association */

export const setupAssociations = (sequelize: Sequelize) => {

    /* User has one emergency plan */ 
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
    /* Package Item */
    // PackageItem.belongsTo(PortfolioPackage, {
    //     foreignKey: 'Package_ID', targetKey: 'Package_ID'
    // })
    // PackageItem.belongsTo(MutualFund, {
    //     foreignKey: 'Fund_ID', targetKey: 'Fund_ID'
    // })

    PortfolioPackage.belongsToMany(MutualFund, {
        through: 'PackageItem',
        foreignKey: 'Package_ID',
    })

    MutualFund.belongsToMany(PortfolioPackage, {
        through: 'PackageItem',
        foreignKey: 'Fund_ID',
    })

    /* Portfolio Item */
    // PortfolioItem.belongsTo(InvestmentPortfolio, {
    //     foreignKey: 'Portfolio_ID', targetKey: 'Portfolio_ID'
    // })
    // PortfolioItem.belongsTo(MutualFund, {
    //     foreignKey: 'Fund_ID', targetKey: 'Fund_ID'
    // })

    InvestmentPortfolio.belongsToMany(MutualFund, {
        through: PortfolioItem,
        foreignKey: 'Portfolio_ID'
    })

    MutualFund.belongsToMany(InvestmentPortfolio, {
        through: PortfolioItem,
        foreignKey: 'Fund_ID'
    })
}
/* ------ */