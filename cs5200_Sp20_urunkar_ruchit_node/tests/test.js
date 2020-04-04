const dbConfig = require('../data/db')
const mongoose = require('mongoose')
dbConfig.dbConfig();
const universityDao = require('../data/dao/university.dao.server')

async function testTruncateDatabase() {
    //confirmation on console about data deletion - if data already exists.
    await universityDao.truncateDatabase();
}

async function testPopulateDatabase() {
    await universityDao.populateDatabase();
}

async function testStudentsInitialCount() {
    //initial student count : 2 - confirm on console
    await universityDao.getStudentCount().then(count => console.log("Initial Student count: " + count));
}

async function testQuestionsInitialCount() {
    //initial question count : 4 - confirm on console
    await universityDao.getQuestionCount().then(count => console.log("Initial Question count: " + count));
}

async function testAnswersInitialCount() {
    //initial answer count : 8 - confirm on console
    await universityDao.getAnswerCount().then(count => console.log("Initial Answer count: "+ count));
}

async function testDeleteAnswer() {
    //answer's count should be 7 and Bob's answers count should be 3 - confirm on console
    await universityDao.deleteAnswerByQuestionUser("What does ORM stand for?","Bob");
}

async function testDeleteQuestion() {
    //count should be 3 - confirm on console
    await universityDao.deleteQuestionByTitle("Is the following schema valid?");
}


async function testDeleteStudent() {
    //count should be 1 - confirm on console
    await universityDao.deleteStudentByFirstName("Bob");
}

async function run() {
    await testTruncateDatabase();
    await testPopulateDatabase();
    await testStudentsInitialCount();
    await testQuestionsInitialCount();
    await testAnswersInitialCount();
    await testDeleteAnswer();
    await testDeleteQuestion()
    await testDeleteStudent();
}

run();