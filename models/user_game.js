"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game.hasOne(models.user_game_biodata, {
        foreignKey: "user_id",
        as: "biodata",
      });
    }
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    generateToken() {
      const payload = {
        id: this.id,
        email: this.email,
        role: this.role,
      };
      return jwt.sign(payload, process.env.JWT_SECRET);
    }

    static authenticate = async ({ email, password }) => {
      try {
        const user =  await this.findOne({ where: { email: email, isVerified: true } });

        if (!user) {
          return Promise.reject(new Error("User not found"));
        }
        const valid = user.checkPassword(password);
        if (!valid) {
          return Promise.reject(new Error("wrong password!"));
        }
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  user_game.init(
    {
      email: DataTypes.STRING,
      userType: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game",
    }
  );
  return user_game;
};
