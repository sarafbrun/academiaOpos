const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('HOLA');
});


module.exports = router;