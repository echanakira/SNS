var faker = require("faker");
var oracledb = require('oracledb');
var express = require("express");
var path = require('path');

oracledb.autoCommit = true;
var config = {
  user          : "ORDS_PUBLIC_USER",
  password      : "oracle",
  connectString : "LOCALHOST:1521/XE"
}
var p_router = express.Router();

//do for every call
p_router.use(function(req,res,next){
  console.log(req.method, req.url);
  next();
})

p_router.get("/",function(req,res,next){
  //renders publisher sign in page with a form switch to register page
  res.sendFile(path.resolve('./views/webIndex.html'));

})
p_router.get("/login", function(req,res){
  //tells users if they have logged in successfully
  //if so, redirects to home page
  //if not, redirects back to Login
  signInPub(req,res)
  //res.write("<html><h1>login path</h1></html>");
})
p_router.post("/register", function(req, res,next){
  //tells user if they have registered successfully
  //if so, redirects to Login
  //if not, redirects to registration?
  checkPubExists(req,res) //calls addPub on it's own

})

p_router.get("/:username/new-message", function(req,res,next){
  //renders new-message form
  res.sendFile(path.resolve('./views/message.html'));
  //addMessage(req, res);
})
p_router.post("/:username/new-message", function(req,res,next){
  //renders new-message form
  //res.sendFile(path.resolve('./views/home.html'));
  addMessage(req, res);
})


var checkPubExists = function (req, res){
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return err;
    }
    connection.execute('select count(name) from publisher where name=:username',
    {username: req.body.username},
    function(err, result) {
      if (err) {console.error(err.message);
      return err;
    }
    console.log(result);
    if (result.rows[0][0] === 0) {
      return addPub(req, res);
    } else {//res.write("<html><h1>Taken</h1></html>");
      res.sendFile(path.resolve('./views/webIndex.html'));
      return;}
    })
  })
}

var addPub = function (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    console.log(req.body.username);
    console.log(req.body.password);
    //connection.execute('select count(name) from reader where name=:username',)
    connection.execute('insert into publisher values (:username, :email, :password)',
    { username: req.body.username, email: req.body.email, password: req.body.password},
    function(err, result){
      if (err){console.error(err.message);
      return;
      }
      console.log(result);
      //should send to login page
      res.sendFile(path.resolve('./views/webIndex.html'));
      return;

    })
  })
}

function signInPub(req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    //connection.execute('select count(name) from publisher where name=:username',
      console.log(req.query.username);
      console.log(req.query.password);
      connection.execute('select count(name) from publisher where name=:username and password=:pw',
      {  username: req.query.username, pw: req.query.password},
      function(err, result){
        if(err){console.error(err.message);
          return;
        }
        console.log(result);
        bool = result.rows[0][0];
        console.log('matches:'+bool);
        if(bool === 0){
          res.status(404).write("<html><h1>failure - go back</h1></html>");
          return;
        } else {
          //take to "home" or new messaage page
          res.redirect('/pub/'+req.query.username+'/new-message');
          return;
        }

    })
  })
}

function addMessage (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    //needs MID, content, time_entered, start_time, end_time, long, lat, extend, publisher_id
    //mid can be a hash from vals
    console.log(formatDate(req.body.start_dt));
    console.log(formatDate(req.body.end_dt));
    console.log(formatDate(new Date().toISOString().substring(0,16)));
    connection.execute('insert into message values (:mid, :content, TO_TIMESTAMP(:time_ent,\'YYYY-MM-DD HH24:MI\'), TO_TIMESTAMP(:sdt,\'YYYY-MM-DD HH24:MI\'), TO_TIMESTAMP(:edt,\'YYYY-MM-DD HH24:MI\'), :lo, :la, :ex, :publ)',
    { mid: req.body.title, content: req.body.message_body,
      time_ent: formatDate(new Date().toISOString().substring(0,16)),
      sdt: formatDate(req.body.start_dt), edt: formatDate(req.body.end_dt),
      lo: req.body.long, la: req.body.lat, ex: req.body.extend,
      publ: req.params.username},
    function(err,result){
      if (err){console.error(err.message);
      return;
      }
      res.send(result);
      console.log(result);
      return;
    })
  })
}

/*function curMessageCount() {
  var ret = 0;
  oracledb.getConnection(config, function(err,connection){
    if(err){console.error(err.message);
      return -1;
    }
    connection.execute('select count(MID) from message',
    function(err, result) {
      if (err){console.error(err.message);
      return -1;
    }
    console.log('Message Count: '+ result.rows[0]);
    ret = result.rows[0],10;
  })
})
return ret;
}*/

var formatDate = function(dt_string) {
  return dt_string.replace('T',' ');

}

module.exports = p_router;
