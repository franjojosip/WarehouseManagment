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

//Add authenticateAdmin and authenticateJWT check for list, edit, remove
router.get('/', list);
router.patch('/:id', checkParamID, edit);
router.delete('/remove/:id', checkParamID, remove);

router.post('/login', login);
router.post('/register', register); //Add authenticateAdmin and authenticateJWT check
router.post('/logout', logout);

module.exports = router;