const express = require('express');
const router = express.Router();
const { biodata } = require('../controllers');
const middle = require('../middlewares/authorize');
const role = require('../utils/roles');



router.get('/', biodata.getAll);
router.post('/', middle([role.admin, role.user]), biodata.create);
router.put('/:id', middle([role.admin, role.user]), biodata.update);
router.delete('/:id', middle([role.admin]), biodata.delete);


module.exports = router;