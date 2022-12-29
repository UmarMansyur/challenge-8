const { notification } = require('../models');
const app = require('../app');
const io = require("../utils/socket.js");


module.exports = {
    createNotification: async (req, res, next) => {
        try {
            const { user_id, title, message } = req.body;
            
            const data = await notification.create({
                user_id,
                title,
                message,
                is_read: false,
                is_deleted: false
            });

            io.emit(`NOTIFICATIONS-${user_id}`, data);

            res.status(201).json({
                message: 'Notification created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    },
    getNotification: async (req, res, next) => {
        try {
            const data = await notification.findAll({
                where: {
                    is_deleted: false
                }
            });
            res.status(200).json({
                message: 'Get all notification successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    },
    getNotificationByUserId: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const data = await notification.findAll({
                where: {
                    user_id,
                    is_deleted: false
                }
            });

            res.status(200).json({
                message: 'Get all  successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    },
};
