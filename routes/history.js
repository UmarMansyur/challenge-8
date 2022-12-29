const express = require('express');
const router = express.Router();
const middle = require('../middlewares/authorize');
const { history } = require('../controllers');
const roles = require('../utils/roles');


router.get('/', middle([roles.user]), history.getAll);
router.post('/',  middle([roles.user]), history.create);
router.put('/:id',  middle([roles.admin]), history.update);
router.delete('/:id',  middle([roles.admin]), history.delete);

module.exports = router;