const { user_game_biodata } = require("../models");
module.exports = {
  getAll: async (req, res) => {
    try {
      const biodata = await user_game_biodata.findAll();
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Data berhasil ditampilkan",
        data: biodata,
      });
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const user = req.user_game;
      const userId = user.id;
      const { nama, email, phone_number } = req.body;
      const biodata = await user_game_biodata.create({
        user_id: userId,
        nama,
        email,
        phone_number,
      });
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
        data: biodata,
      });
    } catch (error) {
      console.log(error.getMessage);
    }
  },
  update: async (req, res) => {
    try {
      const user = req.user_game;
      const id = user.id;
      const { user_id, nama, email, phone_number } = req.body;
      const biodata = await user_game_biodata.update(
        {
          user_id,
          nama,
          email,
          phone_number,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Data berhasil diubah",
        data: biodata,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const biodata = await user_game_biodata.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Data berhasil dihapus",
        data: biodata,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
