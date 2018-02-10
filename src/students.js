function student_database_work() {

    var self = this;
    var all_students = 'SELECT id, name, age, grade FROM students;'; 

    this.get_all_student_info = function(database) {
        var students = [];
        return new Promise((resolve, reject) => {
            database.each(all_students, function (err, row) {
                if (err) console.error(err.message);
                else students.push(row);
            }, function onComplete(err, rowsReturned) {
                resolve(students);
            });
        }); 
    }

    this.get_individual_students_info = function(database, id) {
        var student = {};
        return new Promise((resolve, reject) => {  
            database.each(`SELECT students.id, students.name, students.age, students.grade, 
                attempts.student_id, attempts.test_id, attempts.score, 
                attempts.date FROM students JOIN attempts ON 
                students.id = attempts.student_id where students.id = $id;`, {$id: id} , 
                function (err, row) {
                    if (err) console.error(err.message);
                    else { 
                        student = build_student(student, row)
                    }      
            },function onComplete(err, rowsReturned) {
                resolve(student);
            });
        });
    }

    function add_student_details(row) {
        return {
            id: row.id, name: row.name,
            age: row.age, grade: row.grade, attempts:[]
        };
    }

    function add_to_students_attempts(student, row) { 
        student.attempts.push({ 
            student_id: row.student_id, test_id: row.test_id, 
            score: row.score, date: row.date });
        return student; 
    }
 
    function build_student(student, row) {
        if (Object.keys(student) == 0) { 
            student = add_student_details(row);
        }
        return add_to_students_attempts(student, row);
    }
}

module.exports = student_database_work;
