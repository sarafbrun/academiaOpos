//Queries fantasiosas


const create = ({ email, password, username, role }) => {
    return db.query('insert into users (email, password, username, role) values (?,?,?,?)', [email, password, username, role]);
}

const getByEmail = (email) => {
    return db.query('select * from users where email = ?', [email]);
}

const getUserById = (userId) => {
    return db.query('select * from users where id = ?', [userId]);
}

const getUserByUsername = (username) => {
    return db.query('SELECT users.id FROM counts_app.users WHERE users.username = ?', [username])
}

const getRole = (groupId) => {
    return db.query(`Select uhg.role FROM counts_app.users_has_groups as uhg
JOIN counts_app.users as u ON u.id = uhg.users_id
JOIN counts_app.groups as g ON g.id = uhg.users_id
WHERE g.id = ? AND uhg.role = "admin"`, [groupId])
}

const deleteUser = (userId) => {
    return db.query('DELETE FROM academia_opos.users WHERE id = ?', [userId]);
}

module.exports = { create, getByEmail, getUserById, getUserByUsername, getRole, deleteUser }