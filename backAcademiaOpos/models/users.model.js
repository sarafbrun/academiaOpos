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
    return db.query('SELECT users.id FROM academiaopos.users WHERE users.username = ?', [username]);
}

const getRole = (groupId) => {
    return db.query(`Select uhg.role FROM academiaopos.users_has_groups as uhg
JOIN academiaopos.users as u ON u.id = uhg.users_id
JOIN academiaopos.groups as g ON g.id = uhg.users_id
WHERE g.id = ? AND uhg.role = "admin"`, [groupId]);
}

const deleteUser = (userId) => {
    return db.query('DELETE FROM academiaopos.users WHERE users.id = ?', [userId]);
}


module.exports = { create, getByEmail, getUserById, getUserByUsername, getRole, deleteUser }