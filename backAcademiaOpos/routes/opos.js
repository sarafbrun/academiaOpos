const router = require('express').Router();


router.use('/users', require('./opos/users.js'));






module.exports = router;