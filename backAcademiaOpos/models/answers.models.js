

const getAllAnswers = (questionId) => {
    return db.query('SELECT a.id, a.answer, a.questions_id, q.question FROM academia_opos.answers as a JOIN academia_opos.questions as q ON q.id = a.questions_id WHERE a.questions_id = ?;', [questionId]);
}

const createAnswers = (questionId, { answer }) => {
    return db.query('insert into answers (answer, questions_id) values (?, ?)', [answer, questionId]);
}

const updateAnswers = (answersId, { answer }) => {
    return db.query(`update answers set answer = ? where id = ?`, [answer, answersId]);
}

const deleteAnswers = (answerId) => {
    return db.query('DELETE FROM academia_opos.answers WHERE id = ?', [answerId]);
}

const getAnswersById = (answerId) => {
    return db.query('SELECT * FROM academia_opos.answers WHERE id = ?', [answerId]);
}





module.exports = { getAllAnswers, createAnswers, updateAnswers, deleteAnswers, getAnswersById }