const express = require('express');
const router = express.Router();
const middle = require('../middlewares/authorize');
const role = require('../utils/roles');
const { auth } = require('../controllers');


router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/auth/login/google', auth.loginGoogle);
router.get('/auth/login/facebook', auth.loginFacebook);
router.get('/saya', middle([role.admin, role.user]), auth.saya);
router.get('/auth/verif', auth.isVerified);
router.post('/auth/forgot-password', auth.forgotPassword);	
router.patch('/auth/reset-password', auth.resetPassword);
module.exports = router;