const mysql = require('mysql');

let teacher = {
    list: function (con) {
        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM teachers", (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports=teacher
