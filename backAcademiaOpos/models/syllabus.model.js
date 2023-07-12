const getAllSyllabus = () => {
    return db.query("SELECT * FROM academia_opos.syllabus");
}

const getByType = (type) => {
    return db.query("SELECT * FROM academia_opos.syllabus where type = ?", [type]);
}

const createSyllabus = ({ route, type }) => {
    return db.query('insert into syllabus (route, type) values (?, ?)', [route, type]);
}

const getSyllabusByIdAndType = (syllabusId, role) => {
    return db.query('select * FROM academia_opos.syllabus WHERE id = ? AND type = ?', [syllabusId, role]);
}

const getSyllabusById = (syllabusId) => {
    return db.query('select * FROM academia_opos.syllabus WHERE id = ?', [syllabusId]);
}

const updateSyllabus = (Id, { route, type }) => {
    return db.query(
        `update syllabus set
        route = ?,
        type = ? where id = ?
        `,
        [route, type, Id]
    );
}

const deleteSyllabus = (Id) => {
    return db.query('DELETE FROM academia_opos.syllabus WHERE id = ?', [Id]);
}

module.exports = { getAllSyllabus, getByType, createSyllabus, updateSyllabus, deleteSyllabus, getSyllabusById, getSyllabusByIdAndType }