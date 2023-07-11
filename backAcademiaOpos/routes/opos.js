const router = require('express').Router();


router.use('/users', require('./opos/users.js'));

router.use('/tests', require('./opos/tests.js'));
router.use('/syllabus', require('./opos/syllabus.js'));





module.exports = router;