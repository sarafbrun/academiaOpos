const router = require('express').Router();
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const { getAllQuestions, createQuestion, updateQuestion, deleteQuestion, getQuestionById } = require('../../models/questions.model');

router.get('/:testId', checkToken, async (req, res) => {

    const { testId } = req.params;

    try {
        const [result] = await getAllQuestions(testId);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
});


router.post('/new/questions/:testId', checkToken, checkAdmin(), async (req, res) => {

    const { testId } = req.params;

    try {
        const [result] = await createQuestion(testId, req.body)
        res.json(result);

    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/edit/:testId/questions/:questionId', checkToken, checkAdmin(), async (req, res) => {

    const { questionId } = req.params;

    try {
        const [result] = await updateQuestion(questionId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.delete('/delete/question/:questionId', checkToken, checkAdmin(), async (req, res) => {

    const { questionId } = req.params;

    try {
        const [result] = await getQuestionById(questionId);
        if (result.length === 0) {
            return res.json({ fatal: 'La pregunta seleccionada no existe' })
        }

        await deleteQuestion(questionId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }

})






module.exports = router;