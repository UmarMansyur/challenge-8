const { answers } = require('../models');
module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await answers.findAll();
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
                data: data,
            });
        } catch (error) {
            res.send(error.getMessage())
        }
    },
    create: async (req, res) => {
        try {
            const { questions_id, choice, status  } = req.body;
            const data = await answers.create({
                questions_id, choice, status
            });

            return res.status(201).json({
                jsonapi: {
                    version: "1.0",
                },
                meta: {
                    author: 'Muhammad Umar Mansyur',
                    copyright: '2022 ~ BE JavaScript Binar Academy',
                },
                status: 201,
                message: 'Data berhasil ditambahkan',
                data: data
            });
        } catch (error) {
            res.send(error.getMessage)
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { questions_id, choice, status  } = req.body;
            const data = await answers.update({
                questions_id, choice, status
            }, {
                where: {
                    id
                }
            });
            return res.status(200).json({
                jsonapi: {
                    version: "1.0",
                },
                meta: {
                    author: 'Muhammad Umar Mansyur',
                    copyright: '2022 ~ BE JavaScript Binar Academy',
                },
                status: 200,
                message: 'Data berhasil diubah',
                data: data
            });
        } catch (error) {
            res.send(error.getMessage())
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await answers.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json({
                jsonapi: {
                    version: "1.0",
                },
                meta: {
                    author: 'Muhammad Umar Mansyur',
                    copyright: '2022 ~ BE JavaScript Binar Academy',
                },
                status: 200,
                message: 'Data berhasil dihapus',
                data: data
            });
        } catch (error) {
            res.send(error.getMessage)
        }
    }
}