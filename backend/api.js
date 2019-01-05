const express = require('express') 
const moment = require('moment') 
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/user.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('connect ok.');
  });
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  
  next();
});
  app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, function(err, row){
        if(err){
            // console.log(err);
            res.status(500).send(err)
        }else{
            res.status(200).send(row);
        }
    });
  })
app.listen(5000, () => console.log(' port 5000!')) 