'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // notification.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  }
  notification.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    is_read: DataTypes.BOOLEAN,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};