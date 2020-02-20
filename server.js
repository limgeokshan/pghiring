const express = require('express');
const app = express();
const port = 80;
const bodyParser = require('body-parser');
const dbconnect = require('./dbconnect.js');
const student = require('./methods/student.js');
const registration = require('./methods/registration.js');
const teacher = require('./methods/teacher.js')


app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello PgHiring!'))


/*register endpoint*/
app.post('/api/register', function (req, res) {
  let teacher = req.body.teacher;
  let students = req.body.students;
  let con = dbconnect.createConnection()
  for (let entry = 0; entry < students.length; entry++) {
    registration.add(con, students[entry], teacher).then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.status(204)
      res.send(JSON.stringify(result))
    }).catch(function (err) {
      res.status(404)
      res.send(JSON.stringify({ message:"An error has occured" }))
    })
  }
  dbconnect.closeCon(con);
})

/*suspend endpoint*/
app.post('/api/suspend', function (req, res) {
  let studentEmail = req.body['student']
  if (studentEmail === null || studentEmail==="") {
    res.status = 404
    res.statusMessage = ("Please input a student")
    res.send("Please input a student")

  }
  let con = dbconnect.createConnection()

  student.suspend(con, studentEmail).then(result => {
    res.setHeader('Content-Type', 'application/json');
    res.status(204)
    res.statusMessage = ("Student has been suspended")
    res.send("Student has been suspended")
  }).catch(function (err) {
    res.status(404)
    res.statusMessage = ("Student is not found")
    res.send("Student is not found")
  })
})

/*commonstudents endpoint*/
app.get('/api/commonstudents', function (req, res) {
  let teacherEmails = req.query.teacher;
  let con = dbconnect.createConnection()
  let toReturn = {}
  if (Array.isArray(teacherEmails)) {
    registration.getCommonStudents(con,teacherEmails).then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200)
      let studentArr = []
      for(let entry = 0 ; entry < result.length; entry++){
        studentArr.push(result[entry].email)
      }
      toReturn['students'] = studentArr
      res.send(toReturn)
    }).catch(function (err) {
      res.status(404)
      res.statusMessage = ("No matching records found")
      res.send("No matching records found")
    })
  } else {
    registration.getStudents(con,teacherEmails).then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200)
      let studentArr = []
      for(let entry = 0 ; entry < result.length; entry++){
        studentArr.push(result[entry].email)
      }
      toReturn['students'] = studentArr
      res.send(toReturn)
    }).catch(function (err) {
      res.status(404)
      res.statusMessage = ("No matching records found")
      res.send("No matching records found")
    })

  }
  dbconnect.closeCon(con);

})

/*retrieve endpoint*/
app.post('/api/retrievefornotifications', function (req, res) {
  let teacherEmail = req.body['teacher']
  let notification = req.body['notification']
  let con = dbconnect.createConnection()
  let teacherID = null
  let studentRegisteredToRecieve = []
  let notSuspendStudents = {}
  let emailNotification = []
  let toResponse = {}

  notification = notification.split(" @")

  for (let pos = 0; pos < notification.length; pos++) {
    if (notification[pos].indexOf("@") > -1) {
      emailNotification.push(notification[pos].trim())
    }
  }

  let emailMentioned = [];
  teacher.list(con).then(result => {
    for (let entry = 0; entry < result.length; entry++) {
      let teacherEntry = result[entry]
      if (teacherEmail.trim() === teacherEntry.email.trim()) {
        teacherID = teacherEntry.id
        return teacherID
      }
    }
  }).then(teacherID => {
    return registration.listSpecificTeacher(con, teacherID)
  }).then(result => {
    for (let entry = 0; entry < result.length; entry++) {
      studentRegisteredToRecieve.push(result[entry].sid)
    }
  }).then(_ => {
    return student.listNotSuspended(con)
  }).then(result => {
    for (let entry = 0; entry < result.length; entry++) {
      for (let studentRecieve = 0; studentRecieve < studentRegisteredToRecieve.length; studentRecieve++) {
        if (studentRegisteredToRecieve[studentRecieve] === result[entry].id) {
          emailNotification.push(result[entry].email)
        }
      }

      for (let emailMentionedIndex = 0; emailMentionedIndex < emailMentioned.length; emailMentionedIndex++) {
        if (result[entry].email === emailMentioned[emailMentionedIndex]) {
          emailNotification.push(result[entry].email)
        }
      }
    }
    emailNotification = [...new Set(emailNotification)];
    toResponse['recipents'] = emailNotification
    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.send(toResponse)



  }).catch(function (err) {
    res.status(404)
    res.send()
  })



})


module.exports = app