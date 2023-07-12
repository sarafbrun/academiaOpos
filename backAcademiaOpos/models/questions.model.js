const getAllQuestions = (testId) => {
    return db.query('SELECT q.id, q.question, q.tests_id, t.name FROM academia_opos.questions as q JOIN academia_opos.tests as t ON t.id = q.tests_id WHERE tests_id = ?;', [testId]);
}

const createQuestion = (testId, { question }) => {
    return db.query('insert into questions (question, tests_id) values (?, ?)', [question, testId]);
}

const updateQuestion = (questionId, { question }) => {
    return db.query(`update questions set question = ? where id = ?`, [question, questionId]);
}

const deleteQuestion = (questionId) => {
    return db.query('DELETE FROM academia_opos.questions WHERE id = ?', [questionId]);
}

const getQuestionById = (questionId) => {
    return db.query('SELECT * FROM academia_opos.questions WHERE id = ?', [questionId]);
}

module.exports = { getAllQuestions, createQuestion, updateQuestion, deleteQuestion, getQuestionById };