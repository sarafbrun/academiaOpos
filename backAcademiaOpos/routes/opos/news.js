const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const { getAllNews, getNewsByType, createNew, getNewById, deleteNewById } = require('../../models/news.model')

router.get('/', checkToken, async (req, res) => {

    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        if (userRole === "admin") {
            const [news] = await getAllNews();
            res.json(news)
        } else {
            const [news] = await getNewsByType(userId);
            res.json(news);
        }
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/addNew', checkToken, checkAdmin(), async (req, res) => {
    try {
        const [addNew] = await createNew(req.body);
        const [addedNew] = await getNewById(addNew.insertId);

        res.json(addedNew[0]);

    } catch (error) {
        res.json({ fatal: error.message });
    }

});

router.delete('/deleteNew/:newId', checkToken, checkAdmin(), async (req, res) => {

    const { newId } = req.params;

    try {

        const [oneNew] = await getNewById(newId);
        if (oneNew.length === 0) {
            return res.json({ fatal: 'No existe ninguna noticia con ese ID' })
        }

        await deleteNewById(newId);
        res.json(oneNew)


    } catch (error) {
        res.json({ fatal: error.message });
    }
})




module.exports = router;
