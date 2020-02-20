var mysql = require('mysql');



var dbconnect = {
    createConnection: function() {
        var con = mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "pghiring"
        });

        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })
        return con
    },

    closeCon: function(con){
        if(con != null){
            con.end();
        }
    }
}


module.exports = dbconnect;
