const express = require('express');
const router = express.Router();

const authenticateJWT = require('../_helpers/authenticateJWT');
const authenticateAdmin = require('../_helpers/authenticateAdmin');
const checkParamID = require('../_helpers/checkParamID');

const list = require('./list/index');
const add = require('./add/index');
const remove = require('./remove/index');
const edit = require('./edit/index');

//Add authenticateJWT and authenticateAdmin check
router.get('/', list);
router.post('/add', add);
router.delete('/remove/:id', checkParamID, remove);
router.patch('/:id', checkParamID, edit);

module.exports = router;