const getAllTest = () => {
    return db.query("SELECT * FROM academia_opos.test")
}

const getByType = (type) => {
    return db.query("SELECT * FROM academia_opos.test where type = ?", [type])
}

const create = ({ name, type }) => {
    return db.query('insert into test (name, type) values (?, ?)', [name, type]);
}

const update = (Id, { name, type }) => {
    return db.query(
        `update test set
        name = ?,
        type = ? where id = ?
        `,
        [name, type, Id]
    )
}

const deleteTest = (Id) => {
    return db.query('DELETE FROM academia_opos.test WHERE id = ?', [Id]);
}




module.exports = { getAllTest, getByType, create, update, deleteTest }

