const router = require('express').Router();
const middle = require('../middlewares/authorize');
const role = require('../utils/roles');
const controller = require('../controllers');
const multer = require('multer');
const upload = multer();

router.get('/', middle([role.admin, role.user]), controller.user.getProfile);
router.put('/', middle([role.admin, role.user]), upload.single('thumbnail'), controller.user.updateProfile);


module.exports = router;