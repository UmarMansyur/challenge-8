const router = require('express').Router();
const middle = require('../middlewares/authorize');
const role = require('../utils/roles');
const controller = require('../controllers/');




router.get('/:user_id', controller.notification.getNotificationByUserId);
router.post('/', controller.notification.createNotification);
module.exports = router;