const studentModel = require('../model/student.model.server')
const questionModel = require('../model/question.model.server')
const answerModel = require('../model/answer.model.server')

async function truncateDatabase() {
    await answerModel.deleteMany().then(deleted => console.log(deleted))
    await questionModel.deleteMany().then(deleted => console.log(deleted))
    await studentModel.deleteMany().then(deleted => console.log(deleted))
}

async function populateDatabase() {
    var student = {
        _id : 123,
        firstName : 'Alice',
        lastName : 'Wonderland',
        username : 'alice',
        password : 'alice',
        gradYear: 2020,
        scholarship : 15000
    }

    await this.createStudent(student);

    student = {
        _id : 234,
        firstName : 'Bob',
        lastName : 'Hope',
        username : 'bob',
        password : 'bob',
        gradYear: 2021,
        scholarship : 12000
    }
    await this.createStudent(student)

    await this.createQuestion({
         _id: 321,
         question: "Is the following schema valid?",
         points: 10,
         questionType: "TRUE_FALSE",
         trueFalse: {isTrue : false}
    })

    await this.createQuestion({
                                     _id: 432,
                                     question: "DAO stands for Dynamic Access Object.",
                                     points: 10,
                                     questionType: "TRUE_FALSE",
                                     trueFalse: {isTrue : false}
                                 })


    this.createQuestion({
                                     _id: 543,
                                     question: "What does JPA stand for?",
                                     points: 10,
                                     questionType: "MULTIPLE_CHOICE",
                                     multipleChoice: {
                                         choices : "Java Persistence API, Java Persisted Application JavaScript Persistence API JSON Persistent Associations",
                                         correct : 1
                                     }
        })


    await this.createQuestion({
                                     _id: 654,
                                     question: "What does ORM stand for?",
                                     points: 10,
                                     questionType: "MULTIPLE_CHOICE",
                                     multipleChoice: {
                                         choices : "Object Relational Model,Object Relative Markup,Object Reflexive Model,Object Relational Mapping",
                                         correct : 4
                                     }
                                 })


    await this.createAnswer({
                                   _id : 123,
                                   trueFalseAnswer :true,
                                   student : 123,
                                   question : 321
                               })

    await this.createAnswer({
                                   _id : 234,
                                   trueFalseAnswer :false,
                                   student :123,
                                   question :432
                               })

    await this.createAnswer({
                                   _id : 345,
                                   multipleChoiceAnswer :1,
                                   student : 123,
                                   question : 543
                               })

    await this.createAnswer({
                                   _id : 456,
                                   multipleChoiceAnswer :2,
                                   student : 123,
                                   question : 654
                               })

    await this.createAnswer({
                                   _id : 567,
                                   trueFalseAnswer :false,
                                   student : 234,
                                   question : 321
                               })
    await this.createAnswer({
                                   _id : 678,
                                   trueFalseAnswer :true,
                                   student :234,
                                   question :432
                               })

    await this.createAnswer({
                                   _id : 789,
                                   multipleChoiceAnswer :3,
                                   student : 234,
                                   question : 543
                               })

    await this.createAnswer({
                                   _id : 890,
                                   multipleChoiceAnswer :4,
                                   student : 234,
                                   question : 654
                               })

}

async function getStudentCount() {
    return await studentModel.countDocuments();

}

async function getQuestionCount() {
    return await questionModel.countDocuments()
}

async function getAnswerCount() {
    return await answerModel.countDocuments();
}

async function deleteAnswerByQuestionUser(question, answeredBy) {

    let questionId = await questionModel.findOne({question: question}, {_id:1})
    let studentId = await studentModel.findOne({firstName : answeredBy}, {_id:1});

    let answerId = await answerModel.findOne({student: studentId._id, question : questionId._id})
    if(answerId!=null)
        await this.deleteAnswer(answerId._id)
    answerModel.countDocuments().then(answerCount => console.log("Answer count after deletion: "+ answerCount));
    answerModel.countDocuments({student:studentId._id})
            .then(answerCount => console.log("Bob's Answer count after deletion: "+ answerCount));
}

async function deleteQuestionByTitle(question) {
    let questionId = await questionModel.findOne({question: question}, {_id:1})
    if(questionId!=null)
        await this.deleteQuestion(questionId._id)
    this.getQuestionCount().then(count => console.log("Question count after deletion: "+count))
}

async function deleteStudentByFirstName(student) {
    let studentId = await studentModel.findOne({firstName : student}, {_id:1});
    if(studentId!=null)
        await this.deleteStudent(studentId._id)
    this.getStudentCount().then(count => console.log("Student count after deletion: "+count))
}

function createStudent(student) {
    return studentModel.create(student)
}

function createQuestion(question) {
    return questionModel.create(question)
}

function createAnswer(answer){
    return answerModel.create(answer)
}

function findAllStudents() {
    return studentModel.find();
}

function findStudentById(id) {
    return studentModel.findById(id)
}

function deleteStudent(id) {
    return studentModel.deleteOne({_id:id});
}

function deleteQuestion(id) {
    return questionModel.deleteOne({_id: id});
}

function deleteAnswer(id){
    return answerModel.deleteOne({_id:id})
}

function findAllQuestions() {
    return questionModel.find()
}

function findQuestionById(id) {
    return questionModel.findById(id)
}


function answerQuestion(studentId, questionId, answer){

    findAnswerById(answer._id).then(ans => {
                            if(ans) {
                                console.log("found!!")
                                ans['student'] = studentId;
                                ans['question'] = questionId;
                                console.log(ans)
                                ans.save()
                                answerModel.update({_id:ans._id}, {$set : ans})
                            }
                            else {
                                console.log("Not Found!!")
                                answer['student'] = studentId;
                                answer['question'] = questionId;
                                createAnswer(answer)
                            }
                            })

}

function findAllAnswers() {
    return answerModel.find()
}

function findAnswerById(id) {
    return answerModel.findById(id)
}

function findAnswersByStudent(studentId) {
    return answerModel.find({student : studentId})
}

function findAnswersByQuestion(questionId) {
    return answerModel.find({student : studentId})
}

module.exports = {
    truncateDatabase,
    populateDatabase,
    getStudentCount,
    getQuestionCount,
    getAnswerCount,
    createStudent,
    createQuestion,
    createAnswer,
    answerQuestion,
    findAllStudents,
    findAllQuestions,
    findAllAnswers,
    findStudentById,
    findQuestionById,
    findAnswerById,
    findAnswersByQuestion,
    findAnswersByStudent,
    deleteStudent,
    deleteQuestion,
    deleteAnswer,
    deleteAnswerByQuestionUser,
    deleteQuestionByTitle,
    deleteStudentByFirstName
}