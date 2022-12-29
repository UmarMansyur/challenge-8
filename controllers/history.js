const { histories } = require('../models');
module.exports = {
    getAll: async (req, res, next) => {
        try {
            const histories = await histories.findAll();
            return res.status(200).json({
                jsonapi: {
                    version: "1.0",
                },
                meta: {
                    author: 'Muhammad Umar Mansyur',
                    copyright: '2022 ~ BE JavaScript Binar Academy',
                },
                status: 200,
                message: 'Data berhasil ditampilkan',
                data: histories
            });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const id = req.user_game;
            const { high_score, current_score } = req.body;
            const histories = await histories.create({
                user_id: id, high_score, current_score
            })
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
                data: histories
            });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { user_id, question_id, answer } = req.body;
            const histories = await histories.update({
                user_id, question_id, answer
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
                data: histories
            });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const histories = await histories.destroy({
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
                data: histories
            });
        } catch (error) {
            next(error);
        }
    }
}
