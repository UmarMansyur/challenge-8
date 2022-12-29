const express = require('express');
const router = express.Router();
const middle = require('../middlewares/authorize');
const role = require('../utils/roles')
const {question} = require('../controllers');

router.get('/', question.getAll);
router.post('/', middle([role.admin]), question.create);
router.put('/:id', middle([role.admin]), question.update);
router.delete('/:id', middle([role.admin]), question.delete);



module.exports = router;