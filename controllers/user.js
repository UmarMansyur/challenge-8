const { user_game, user_game_biodata } = require("../models");
const imagekit = require("../utils/imageKit");
module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const data = await user_game_biodata.findOne({
        include: [
          {
            model: user_game,
            as: "user",
            where: {
              email: req.user.email,
            },
          },
        ],
      });
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
        data: data,
      };

      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      console.log(req.user);
      const { thumbnail, nama } = req.body;
      if (req.file != undefined) {
        const file = req.file.buffer.toString("base64");
        const uploadedFile = await imagekit.upload({
          file,
          fileName: req.file.originalname,
        });
        await user_game_biodata.update(
          {
            nama,
            thumbnail: uploadedFile.url,
          },
          { where: { user_id: req.user.id } }
        );
      } else {
        await user_game_biodata.update(
          {
            nama,
          },
          { where: { user_id: req.user.id } }
        );
      }
      const profile = await user_game_biodata.findOne({
        include: [
          {
            model: user_game,
            as: "user",
            where: {
              email: req.user.email,
            },
          },
        ],
      });
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 201,
        message: "Data berhasil ditambahkan",
        data: profile,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
