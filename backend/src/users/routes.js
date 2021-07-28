const express = require('express');
const router = express.Router();
const authenticateJWT = require('../_helpers/authenticateJWT');
const authenticateAdmin = require('../_helpers/authenticateAdmin');
const checkParamID = require('../_helpers/checkParamID');

const list = require('./list/index')
const edit = require('./edit/index')
const remove = require('./remove/index')
const login = require('./auth/login')
const register = require('./auth/register')
const logout = require('./auth/logout')

router.post('/', authenticateJWT, authenticateAdmin, list);
router.patch('/:id', checkParamID, authenticateJWT, authenticateAdmin, edit);
router.delete('/remove/:id', checkParamID, authenticateJWT, authenticateAdmin, remove);

router.post('/login', login);
router.post('/register', authenticateJWT, authenticateAdmin, register);
router.post('/logout', logout);

module.exports = router;