const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { create, getByEmail, getUserById, getRole, deleteUser, updateUserById } = require('../../models/users.model')
const { createToken } = require('../../helpers/utils');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');

router.get('/username', checkToken, async (req, res) => {
    try {

        const { username } = req.user


        res.json(username)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/user/:userId', async (req, res) => {
    try {

        const { userId } = req.params
        const [user] = await getUserById(userId)
        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


/* router.get('/get/role/:groupId', async (req, res) => {
    try {

        const { groupId } = req.params
        const [role] = await getRole(groupId)
        res.json(role[0].role)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}); */





router.get('/loggedId', checkToken, async (req, res) => {
    try {

        const { id } = req.user


        res.json(id)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


//POST /opos/register
router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8)

    try {
        const [result] = await create(req.body);
        res.json(result);
    } catch (err) {
        res.json({ Fallo: err.message })
    }
});

//POST /opos/login
router.post('/login', async (req, res) => {
    try {
        //Existe el email en la base de datos?
        const [result] = await getByEmail(req.body.email)
        if (result.length === 0) {
            return res.json({ Fatal: 'error en el email o contraseña' })
        }

        const users = result[0];
        // ¿las passwords coinciden?
        //tenemos la password de la base de datos y la password que le paso por el body, comprobamos si coinciden
        const iguales = bcrypt.compareSync(req.body.password, users.password);
        if (!iguales) {
            return res.json({ Fatal: 'error en el email o contraseña' })
        }


        res.json({
            success: 'login correcto',
            token: createToken(users)
        });

    } catch (err) {
        res.json({ fallo: err.message });
    }
});

//EDIT USER
router.put('/edit/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;
    req.body.password = bcrypt.hashSync(req.body.password, 8)

    try {
        await updateUserById(userId, req.body);

        const [user] = await getUserById(userId);
        res.json(user[0]);

    } catch (error) {
        res.json({ fatal: error.message });
    }
})



//DELETE USER
router.delete('/delete/:userId', checkToken, checkAdmin(), async (req, res) => {

    const { userId } = req.params;

    try {
        const [user] = await getUserById(userId);
        if (user.length === 0) {
            return res.json({ fatal: 'El usuario seleccionado no existe' });
        }

        await deleteUser(userId);

        res.json(user[0]);

    } catch (error) {
        res.json({ fatal: error.message })
    }
});


router.delete('/delete/:userId', checkToken, checkAdmin(), async (req, res) => {

    const { userId } = req.params
    try {
        await deleteUser(userId)
        res.json('Usuario eliminado')
    } catch (error) {
        res.json({ error: error.message })
    }
});





module.exports = router;