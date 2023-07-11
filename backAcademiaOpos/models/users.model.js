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
    return db.query('SELECT users.id FROM academia_opos.users WHERE users.username = ?', [username]);
}

const getRole = (groupId) => {
    return db.query(`Select uhg.role FROM academia_opos.users_has_groups as uhg
JOIN academia_opos.users as u ON u.id = uhg.users_id
JOIN academia_opos.groups as g ON g.id = uhg.users_id
WHERE g.id = ? AND uhg.role = "admin"`, [groupId]);
}

const updateUserById = (userId, { email, password, username }) => {
    return db.query(`update academia_opos.users set email = ?,
    password = ?, 
    username = ? where id = ?`,
        [email, password, username, userId]);
}


const deleteUser = (userId) => {
    return db.query('DELETE FROM academia_opos.users WHERE users.id = ?', [userId]);
}


module.exports = { create, getByEmail, getUserById, getUserByUsername, getRole, deleteUser, updateUserById }