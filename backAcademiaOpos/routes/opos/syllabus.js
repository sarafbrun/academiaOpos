const router = require('express').Router();
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const { getAllSyllabus, getByType, createSyllabus, updateSyllabus, deleteSyllabus, getSyllabusById, getSyllabusByIdAndType } = require('../../models/syllabus.model');



router.get('/', checkToken, async (req, res) => {

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

router.get('/tema/:syllabusId', checkToken, async (req, res) => {

    const { syllabusId } = req.params;
    const userRole = req.user.role;

    try {
        if (userRole === "admin") {
            const [result] = await getSyllabusById(syllabusId);

            return res.json(result);
        }

        const [result] = await getSyllabusByIdAndType(syllabusId, userRole);
        if (result.length === 0) {
            res.send("<h1>No existe el tema seleccionado</h1>")
        }
        else {
            res.json(result);
        }

    } catch (error) {
        res.json({ error: error.message });
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