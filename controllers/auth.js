require("dotenv").config();
const { user_game, user_game_biodata } = require("../models");
const { QueryTypes, where } = require("sequelize");
const googleOauth2 = require("../utils/oauth2/google");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../utils/roles");
const userType = require("../utils/userTypes");
const { sendEmail } = require("../utils/sendEmail");
const { API_HOST } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existUser = await user_game.findOne({ where: { email } });
      if (existUser) {
        return res.status(422).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 422,
          message: "Name already exist",
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        email,
        role: roles.user,
        userType: userType.basic,
        password: encryptedPassword,
      });

      const detailUser = await user_game_biodata.create({
        user_id: user.id,
      });
      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const link = process.env.API_HOST + `/auth/verif?token=${token}`;

      const response = await sendEmail(
        user.email,
        "Welcome to Quiz Challenge",
        `<h1>Selamat bergabung di Binar Academy</h1><a href=${link}>Klik link berikut untuk verifikasi<a/>`
      );

      return res.status(201).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 201,
        message: "Data berhasil ditambahkan",
        data: {
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await user_game.authenticate(req.body);
      const access_token = user.generateToken();
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Login success",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          token: access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  loginGoogle: async (req, res, next) => {
    try {
      const code = req.query.code;
      if (!code) {
        const url = googleOauth2.generateAuthURL();
        return res.redirect(url);
      }

      await googleOauth2.setCredentials(code);
      const { data } = await googleOauth2.getUserData();
      let userExist = await user_game.findOne({ where: { email: data.email } });

      if (!userExist) {
        userExist = await user_game.create({
          email: data.email,
          role: roles.user,
          userType: userType.google,
          isVerified: true,
        });
        detailUser = await user_game_biodata.create({
          user_id: userExist.id,
          nama: data.name,
          thumbnail: data.picture,
        });
        sendEmail(userExist.email, "Welcome to Quiz Challenge", `<h1>Selamat bergabung di Binar Academy</h1>`);

      } else {
        await user_game_biodata.update(
          {
            thumbnail: data.picture,
          },
          {
            where: {
              user_id: userExist.id,
            },
          }
        );
      }

      const response = await user_game_biodata.findOne({
        include: [
          {
            model: user_game,
            as: "user",
            where: {
              id: userExist.id,
            },
          },
        ],
      });

      const payload = {
        id: userExist.id,
        email: userExist.email,
        role: userExist.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).json({
        status: true,
        message: "Data Retrived Successfully",
        data: token,
      });
    } catch (err) {
      next(err);
    }
  },
  loginFacebook: async (req, res, next) => {
    try {
      const code = req.query.code;
      if (!code) {
        const url = facebookOauth2.generateAuthURL();
        return res.redirect(url);
      }
      const access_token = await facebookOauth2.getAccessToken(code);
      const userInfo = await facebookOauth2.getUserInfo(access_token);
      res.send(userInfo);
    } catch (err) {
      next(err);
    }
  },
  isVerified: async (req, res, next) => {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(422).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 422,
          message: "Token is required",
        });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (!payload) {
        return res.status(422).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 422,
          message: "Token is invalid",
        });
      }
      await user_game.update(
        {
          isVerified: true,
        },
        { where: { id: payload.id } }
      );
      return res.send("Verifikasi berhasil");
    } catch (error) {
      next(error);
    }
  },
  saya: async (req, res, next) => {
    try {
      const user = await user_game_biodata.findOne(
        {
          include: [
            {
              model: user_game,
              as: "user",
              where: {
                email: req.user.email,
              },
            },
          ],
        },
        {
          where: {
            user_id: req.user.id,
          },
        }
      );
      const result = {
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Success",
        data: user,
      };
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await user_game.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 404,
          message: "User not found",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const url = API_HOST + "/auth/reset-password?token=" + token;
      await sendEmail(email, "Reset Password", `<a href="${url}">Klik disini untuk reset password</a>`);
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Success",
      });
    } catch (err) {
      console.log(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(422).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 422,
          message: "Token is required",
        });
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      if (!payload) {
        return res.status(422).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 422,
          message: "Token is invalid",
        });
      }

      const user = await user_game.findOne({ where: { id: payload.id } });
      if (!user) {
        return res.status(404).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 404,
          message: "User not found",
        });
      }

      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      
      await user_game.update(
        {
          password: hash,
        },
        { where: { id: payload.id } }
      );

      sendEmail(user.email, "Reset Password", "Password berhasil direset");

      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Success",
      });
    } catch (error) {
      next(error);
    }
  },
};

// npx sequelize-cli model:generate --name notification --attributes "user_id:integer, title:string, message:string, is_read:boolean, is_deleted:boolean"
