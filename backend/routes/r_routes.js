var faker = require("faker");
var oracledb = require('oracledb');
var express = require("express");
var path = require('path');
var validator = require('express-validator');

oracledb.autoCommit = true;
var config = {
  user          : "ORDS_PUBLIC_USER",
  password      : "oracle",
  connectString : "LOCALHOST:1521/XE"
}
///// TODO: add email verification, add message fetching

/////////////////////////////////////////////////////////////////////////////////
var r_router = express.Router();
r_router.use(function(req,res,next){
  console.log(req.method, req.url);
  //archive old things

  next();
})


r_router.get("/",function(req,res,next){
  //may not be needed
})

//LOGIN READER
r_router.get("/login/:username-:password", function(req,res){
  //tells users if they have logged in successfully
  //if so, redirects to home page
  //if not, redirects back to Login
  signInReader(req,res);
})

//REGISTER NEW READER
r_router.post("/register/:username-:password-:email-:lat-:long", function(req, res){
  //tells user if they have registered successfully
  //if so, redirects to Login
  //if not, redirects to registration?
  addReader_checkExists(req,res); //calls addReader itself
})

//DELETE READER - may need to change to post if use doesn't work
r_router.use("/delete/:username-:password",function(req,res){
  oracledb.getConnection(config, function(err, connection){
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute('DELETE FROM reader WHERE name=:username and password=:password',
    {username: req.params.username, password: req.params.password},
      function(err, result){
        if(err) {
          console.error(err.message);
          return;
        }
        res.status(200); //signals that deletion was successful
    })
  })
})

//GET MESSAGES - send as JSON
  //cat is category id or "ALL" for all messages
r_router.get("/message/:cat-:datetime-:lat-:long", function(req, res){
  //call message function
  getMessages(req,res);
})

r_router.post("/location/:username/:lat-:long",function(req, res){
  updateLocation(req,res);
})
//if we are using readercategory table this route will add to it
//r_router.post("/:username/addCat/:cat")
function updateLocation(req, res){
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
        res.status(500);
      return;
    }
    connection.execute('update reader set latitude = :lat, longitude = :long where name=:username',
    {username: req.params.username, lat: req.params.lat, long: req.params.long},
    function(err, result) {
      if (err) {console.error(err.message);
      res.status(500);
      return;
    }
    console.log(result);
    res.status(200);
    } //username taken
      //res.send({message: 'username taken'});}
    )
  })
}

//SUPPORT FUNCTIONS
//to find if location falls in zone, will need to find zone area
function getMessagesHelp (req) {
  var ret = 'select * from message ';
  var dt = req.params.datetime;
  if(dt == 'NOW') { //set to current datetime
    dt = (new Date().toISOString().substring(0,16)).replace('T',' ');
  }
  if(req.params.cat != 'ALL') { //category is specified
    //still need to add in location ... maybe?
    ret = 'select mid, content, publisher_ID from (select * from messagecategory where CAT_ID='+req.params.cat+') natural join message where start_time < TO_TIMESTAMP('+dt+',\'YYYY-MM-DD HH24:MI\') and end_time > TO_TIMESTAMP('+dt',\'YYYY-MM-DD HH24:MI\') and abs(latitude)-(extend1/69) <= abs('+req.params.lat+') and abs(latitude)+(extend1/69) >= abs('+req.params.lat+') and abs(longitude)-(extend1/69) <= abs('+req.params.long+') and abs(longitude)+(extend1/69) >= abs('+req.params.long+');';
  }
  return ret;
}

function getMessages (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if (err) {
      console.error(err.message);
      return;
    }
    var sql_str = getMessagesHelp(req);
    connection.execute(sql_str,
      function(err, result){
        if(err) {
          console.error(err.message);
          return;
        }
        res.json({result})
    })
  })
}


function allReaders (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute('select name from reader',
      function(err, result){
        if(err) {
          console.error(err.message);
          return;
        }
        res.json({page:result})
    })
  })
}

function addRandomReader (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){
      console.error(err.message);
      return;
    }
    connection.execute('insert into reader values (:id, :name, :email, :password)',
    {id: faker.random.number(), name: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()},
    function(err, result){
      if(err){ console.log(err.message);
        return;}
      res.json({page:result})
    })
  })
}

//checks if username is taken - does not check email currently
function addReader_checkExists (req, res){
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
        res.status(500);
      return;
    }
    connection.execute('select count(name) from reader where name=:username',
    {username: req.params.username},
    function(err, result) {
      if (err) {console.error(err.message);
      res.status(500);
      return;
    }
    console.log(result);
      if (result.rows[0][0] === 0) {
        addReader(req, res);//status 200 will probably be sent
        return;
      } else {res.status(404);
          return;
      }
    } //username taken
      //res.send({message: 'username taken'});}
    )
  })
}

function addReader (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      res.status(500);
      return;
    }
    //connection.execute('select count(name) from reader where name=:username',)
    connection.execute('insert into '+req.body.role+' values (:username, :email, :password, :longitude, :latitude)',
    { username: req.params.username, email: req.params.email, password: req.params.password, longitude: req.params.long, latitude: req.params.lat},
    function(err, result){
      if (err){console.error(err.message);
          res.status(500);
          return;
      }
      console.log(result);
      res.status(200); //successful

    })
  })
}


function signInReader (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
        res.status(500);
      return;
    }

    connection.execute('select name, latitude, longitude from reader where name=:username and password=:password',
      {username: req.params.username, password: req.params.password},
      function(err, result){
        if(err){console.error(err.message);
            res.status(500);
          return;
        }
        bool = (result != null);
        console.log('matches? '+bool);
        if(bool === 0){
          res.status(404).send({message: 'invalid'});
        } else {
          res.status(200).json({result});
        }

    })
  })
}

module.exports = r_router;
