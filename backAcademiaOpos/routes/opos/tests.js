const router = require('express').Router();
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const { getAllTest, create, update, deleteTest, getByType, } = require("../../models/tests.model");

router.get('/', checkToken, checkAdmin(), async (req, res) => {
    try {
        const [result] = await getAll()
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/type', checkToken, async (req, res) => {

    try {
        if (req.user.role === "admin") {
            const [result] = await getAllTest()
            res.json(result)
        } else {
            const [result] = await getByType(req.user.role)
            res.json(result)
        }
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.post('/newTest', checkToken, checkAdmin(), async (req, res) => {

    try {
        const [result] = await create(req.body);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.put('/editTest/:id', checkToken, checkAdmin(), async (req, res) => {

    const { id } = req.params

    try {
        const [result] = await update(id, req.body)
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.delete('/delete/:id', checkToken, checkAdmin(), async (req, res) => {

    const { id } = req.params

    try {
        const [result] = await deleteTest(id)
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

module.exports = router;