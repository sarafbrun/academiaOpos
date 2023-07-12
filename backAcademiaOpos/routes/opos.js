const { checkToken } = require('../helpers/middlewares.js');

const router = require('express').Router();


router.use('/users', require('./opos/users.js'));

router.use('/tests', require('./opos/tests.js'));
router.use('/syllabus', require('./opos/syllabus.js'));
router.use('/news', require('./opos/news.js'));
router.use('/tests/q', require('./opos/questions.js'));
router.use('/tests/a', checkToken, require('./opos/answer.js'));





module.exports = router;