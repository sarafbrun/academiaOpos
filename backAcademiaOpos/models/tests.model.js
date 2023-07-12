const getAllTest = () => {
    return db.query("SELECT * FROM academia_opos.tests")
}

const getOneTest = (id) => {
    return db.query("SELECT * from academia_opos.test where id = ?", [id])
}

const getOneTestByType = (id, role) => {
    return db.query("SELECT * from academia_opos.test where id = ? and type = ?", [id, role])
}

const getByType = (type) => {
    return db.query("SELECT * FROM academia_opos.tests where type = ?", [type])
}

const create = ({ name, type }) => {
    return db.query('insert into tests (name, type) values (?, ?)', [name, type]);
}

const update = (Id, { name, type }) => {
    return db.query(
        `update tests set
        name = ?,
        type = ? where id = ?
        `,
        [name, type, Id]
    )
}

const deleteTest = (Id) => {
    return db.query('DELETE FROM academia_opos.tests WHERE id = ?', [Id]);
}




module.exports = { getAllTest, getOneTest, getOneTestByType, getByType, create, update, deleteTest }

