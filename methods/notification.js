const mysql = require('mysql')

let notification = {

  notify: function (con, teacherEmail) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * from STUDENTS where suspended = '0'";
      con.query(query, (err, rows) => {
        if (err) {
          return reject(err)
        } else {
        }
      })
    })

  }
}

module.exports = notification
