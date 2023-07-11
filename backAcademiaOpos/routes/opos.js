const router = require('express').Router();


router.use('/users', require('./opos/users.js'));
router.use('/news', require('./opos/news.js'));





module.exports = router;