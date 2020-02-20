const mysql = require('mysql');
const student = require('./student.js');

let registration = {
    add: function (con, studentEmail, teacherEmail) {
        return new Promise((resolve, reject) => {
            let query ="INSERT INTO registrations (sid, tid) VALUES((SELECT id as sid FROM students where email = ?), (select id as tid from teachers where email = ?))"
            con.query(query,[studentEmail,teacherEmail], (err, rows) => {
                if (err) {
                    if (err.errno == 1062) {
                        return reject(err)
                    } else {
                        return reject(err)
                    }
                } else {
                    resolve({
                        "status":204
                    });
                }
            });
        });
    },
    listSpecificTeacher: function (con,tid) {

        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM registrations where tid = ?",tid, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    },

    
    getStudents: function (con,teacherEmail) {
        return new Promise((resolve, reject) => {
            let query ="SELECT students.email FROM students, registrations, teachers where students.id = registrations.sid and teachers.id = registrations.tid and teachers.email = ?";
            con.query(query, teacherEmail, (err, rows) => {
                if (err) {
                        return reject(err)
                } else {
                    resolve(rows);
                }
            });
        });
    },
    getCommonStudents: function (con,teacherArray) {
        return new Promise((resolve, reject) => {

            let query ="SELECT students.email FROM students, registrations, teachers where students.id = registrations.sid and teachers.id = registrations.tid and teachers.email in (";
            for (let entry = 0; entry < teacherArray.length; entry++) {
                query= query+"'"+teacherArray[entry]+"',";
            }
            query = query.substr(0,query.length-1)
            query=query+") group by students.email having count(distinct teachers.email)="+teacherArray.length+";"
            console.log(query);
            con.query(query, (err, rows) => {
                if (err) {
                        return reject(err)
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = registration
