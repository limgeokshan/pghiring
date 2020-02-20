var mysql = require('mysql');

var student = {
    list: function (con) {

        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM students", (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    },
    suspend: function (con,email) {
        return new Promise((resolve, reject) => {
            con.query("UPDATE students SET suspended = '1' where email=?",email, (err, rows) => {
                if (err){
                    return reject(err)
                }else{
                  return resolve()
                }

            });
        });
    },
    listNotSuspended: function (con) {

        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM students where suspended = '0'", (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });

    }
}

module.exports=student
