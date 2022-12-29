const express = require('express');
const router = express.Router();
const { answer } = require('../controllers');
const middle = require('../middlewares/authorize');
const role = require('../utils/roles');

router.get('/', answer.getAll);
router.post('/', middle([role.admin]), answer.create);
router.put('/:id', middle([role.admin]), answer.update);
router.delete('/:id', middle([role.admin]), answer.delete);

module.exports = router;