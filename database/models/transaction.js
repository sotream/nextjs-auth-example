'use strict';
import {
  Model
} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    txType: {
      type: DataTypes.ENUM(
        'deposit',
        'withdraw',
        'transfer'
      ),
      allowNull: false
    },
    details: {
      type: DataTypes.JSONB
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions'
  });

  return Transaction;
};
