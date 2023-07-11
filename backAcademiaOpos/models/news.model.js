
const getNewsByType = (userId) => {
    return db.query(`SELECT n.id, n.title, n.text, n.date, n.type FROM academia_opos.news as n
    JOIN academia_opos.users as u ON u.role = n.type
    WHERE u.id = ?`, [userId])
};

const getAllNews = () => {
    return db.query(' SELECT * from academia_opos.news')
};

const createNew = ({ title, text, type }) => {
    return db.query(`INSERT INTO academia_opos.news (title,
    text,
    type)
    VALUES
    (?,?,?)`, [title, text, type])
};

const getNewById = (newId) => {
    return db.query('SELECT * FROM academia_opos.news where id = ?', [newId])
};

const deleteNewById = (newId) => {
    return db.query('DELETE FROM academia_opos.news WHERE id = ?', [newId])
}

module.exports = { getNewsByType, getAllNews, createNew, getNewById, deleteNewById };


