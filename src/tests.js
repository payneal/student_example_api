function tests_database_work() {
    
    var self = this;
    var sql_for_test_score_with_students = `Select tests.id, tests.name, 
        tests.maxScore, attempts.date, attempts.student_id, 
        attempts.score FROM tests JOIN attempts ON tests.id = attempts.test_id;`;
                 
     this.get_test_scores_with_student_results = function(database) {
        var test = {}
        return new Promise((resolve, reject) => {
            database.each(sql_for_test_score_with_students ,function(err, row) {
                if (err) console.error(err.message);
                else add_values_to_test(test, row);      
            }, function onComplete(err, rowsReturned) {
                resolve(test);    
            });
        });
    }

    function createTestGroup(row, date) {
        return { 
            name: row.name,
            maxScore: row.maxScore, 
            scores: { 
                [date] : [{ 
                    student_id: row.student_id, 
                    score: row.score  
                }]   
            } 
        };
    }

    function add_values_to_test(test, row) {
      var date = row.date;    
        if (!( row.id in test)) {
            test[row.id] = createTestGroup(row, date); 
        } else if (date in (test[row.id].scores) ) {
            test[row.id].scores[date].push({
                student_id: row.student_id, score: row.score })
        } else { 
            test[row.id].scores[date] = [{ 
                student_id: row.student_id,score: row.score}];
        } 
    }

}

module.exports = tests_database_work;
