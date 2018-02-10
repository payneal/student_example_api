/*
 This file exports a file that creates an anonymous SQL database.
 It then runs the files in the schema directory in alphabetical order.
 Then it runs the files in the seed directory in alphabetical order.

 Every time that the server restarts, the database is remade from scratch
 and the seed data is used to repopulate the database.

 If you want to store the database file in memory, then change the
 databaseFile variable to an actual file path, and then set regenerate flag
 to false, which will prevent the schema directory files and the seed data
 files from running automatically.
 */
"use strict";
const Sqlite = require('sqlite3');
const fileSystem = require('fs');
const path = require('path');
const parse = require('csv-parse');

function connectToSqlite() {
    Sqlite.verbose();
    const databaseFile = ":memory:";
    const regenerate = true;
    const sqliteMode = Sqlite.OPEN_READWRITE | Sqlite.OPEN_CREATE;
    var database;
    return init();

    function init() {
        return new Promise(function (resolve, reject) {
            new Sqlite.Database(databaseFile, sqliteMode, function (err) {
                if (err) {
                    console.error(err.message);
                    throw err;
                }
                database = this;
                load_everything_for_sql_lite()
                .then(function () {
                    resolve(database);
                }).catch(function (err) {
                    console.error(err.message);
                    throw err;
                })
            });
        });
    }
    
    function executeFile(file, directory) {
        //console.info('Executing ' + file);
        var fileContents = fileSystem.readFileSync(path.join(directory, file), {
            encoding: 'utf-8'
        });
        return database_exec(fileContents, file);
    }

    function database_exec(fileContents, file) {
        return new Promise(function (resolve, reject) {
            //console.log(fileContents);
            database.exec(fileContents, function (err) {
                if (err) {
                    console.info('Error Executing ' + file);
                    console.error(err.message);
                    reject(err);
                    return;
                }
                //console.info('Finished Executing ' + file);
                resolve();
            });
        })
    }
    
    function create_attempts_table() {
        database.run(
            `CREATE TABLE attempts ( 
            id INTEGER PRIMARY KEY ASC,
            student_id NOT NULL,
            test_id NOT NULL,
            score INT NOT NULL,
            date DATETIME, 
            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (test_id) REFERENCES test(id))`
        )
    }

    function insert_attempts_csv_to_db() {
        var row_count = 0;
        fileSystem.createReadStream(path.join(__dirname, 'attempts.data.csv'), {encoding:"utf8"})
            .pipe(parse())
            .on('data', function(csvrow) {
                if (row_count !=0 && csvrow.length >1 ) {
                    let sql = `INSERT INTO attempts (student_id, test_id, score, date) Values (?, ?, ?, ?)`;  
                    database.run(sql, csvrow, function(err) { 
                        if (err) console.log(err.message);				
                    }); 
                }
                row_count++;
            })
    }

    function load_everything_for_sql_lite() {
        return load("schema")
            .then( () => load('seed'))
            .then(() => create_attempts_table())
            .then(() => insert_attempts_csv_to_db())
    }

    function load(fileName){
        if (!regenerate) return Promise.resolve();
        const directory = path.join(__dirname, fileName);
        const files = fileSystem.readdirSync(directory, 'utf-8');
        return make_execute_happen(files, directory);
    }

    function make_execute_happen(files, directory) {
        return files.reduce(function (resolveChain, file) {
            return resolveChain.then(function () {
                return executeFile(file, directory);
            })
        }, Promise.resolve());
    }
}

module.exports = connectToSqlite;
