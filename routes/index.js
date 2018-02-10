const express = require('express');
const student_database = require('../src/students');
const test_database = require('../src/tests');
const router = express.Router();
const student_db = new student_database();
const tests_db = new test_database();

/* GET home page. */
router.get('/', function (req, res) {
    res.redirect('/students')
});

router.get('/students', function (req, res) {
    //TODO: this is implemented correctly. Make a test for it.    
    student_db.get_all_student_info(req.database).then((students) => {
        res.json(students);
    });
});

router.get('/students/:id', function (req, res) {
    //TODO: this is broken. Make it satisfy the unit test with minimal changes to the test.
    student_db.get_individual_students_info(req.database, req.params['id'])
        .then((student_info) =>  {
            res.json(student_info);
        })
});

router.get('/tests', function (req, res) {
    //TODO: Implement this route and finish the test
    tests_db.get_test_scores_with_student_results(req.database)
        .then((results) => {
            res.json(results);
        })
});

module.exports = router;
