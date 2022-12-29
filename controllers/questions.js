const { questions } = require('../models');
module.exports = {
    getAll: async (_req, res, next) => {
        try {
            const data = await questions.findAll();
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
                data: data
            });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const { question, value } = req.body;
            const data = await questions.create({
                question, value
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
                data: {
                    question: data.question
                }
            });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { question, value } = req.body;
            await questions.update({
                question,
                value
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
            });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await questions.destroy({
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
                message: 'Data berhasil dihapus'
            });
        } catch (error) {
            next(error);
        }
    }
}