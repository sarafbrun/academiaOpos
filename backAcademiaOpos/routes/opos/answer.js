const { checkAdmin } = require('../../helpers/middlewares');
const { getAllAnswers, createAnswers, updateAnswers, getAnswersById, deleteAnswers } = require('../../models/answers.models');

const router = require('express').Router();


router.get('/:questionId', async (req, res) => {

    const { questionId } = req.params;

    try {
        const [result] = await getAllAnswers(questionId);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
});


router.post('/new/answers/:questionId', checkAdmin(), async (req, res) => {

    const { questionId } = req.params;

    try {
        const [result] = await createAnswers(questionId, req.body)
        res.json(result);

    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/edit/answers/:answerId', checkAdmin(), async (req, res) => {

    const { answerId } = req.params;

    try {
        const [result] = await updateAnswers(answerId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.delete('/delete/answer/:answerId', checkAdmin(), async (req, res) => {

    const { answerId } = req.params;

    try {
        const [result] = await getAnswersById(answerId);
        if (result.length === 0) {
            return res.json({ fatal: 'La respuesta seleccionada no existe' })
        }

        await deleteAnswers(answerId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }

})










module.exports = router