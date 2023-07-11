const router = require('express').Router();
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const { getAllSyllabus, getByType, createSyllabus, updateSyllabus, deleteSyllabus } = require('../../models/syllabus.model');


router.get('/', checkToken, checkAdmin(), async (req, res) => {
    try {
        const [result] = await getAllSyllabus()
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/type', checkToken, async (req, res) => {

    try {
        if (req.user.role === "admin") {
            const [result] = await getAllSyllabus()
            res.json(result)
        } else {
            const [result] = await getByType(req.user.role)
            res.json(result)
        }
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.post('/newsyllabus', checkToken, checkAdmin(), async (req, res) => {

    try {
        const [result] = await createSyllabus(req.body);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.put('/editsyllabus/:id', checkToken, checkAdmin(), async (req, res) => {

    const { id } = req.params

    try {
        const [result] = await updateSyllabus(id, req.body)
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.delete('/delete/:id', checkToken, checkAdmin(), async (req, res) => {

    const { id } = req.params

    try {
        const [result] = await deleteSyllabus(id)
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

module.exports = router;