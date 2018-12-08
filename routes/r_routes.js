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


/////////////////////////////////////////////////////////////////////////////////
var r_router = express.Router();
r_router.use(function(req,res,next){
  console.log(req.method, req.url);
  next();
})

r_router.use("/",function(req,res,next){
  //renders app home page with a form switch to register page
})
r_router.use("/login", function(req,res,next){
  //tells users if they have logged in successfully
  //if so, redirects to home page
  //if not, redirects back to Login

})
r_router.use("/register", function(req, res,next){
  //tells user if they have registered successfully
  //if so, redirects to Login
  //if not, redirects to registration?
})

//assumes reader if pub is not specified
//app.use("/",r_router)

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
      return;
    }
    connection.execute('select count(name) from '+req.body.role+' where name=:username',
    {username: req.body.username},
    function(err, result) {
      if (err) {console.error(err.message);
      return;
    }
    console.log(result);
    if (result.rows[0][0] === 0) {
      addReader(req, res);
    } else {res.send({message: 'username taken'});}
    })
  })
}

function addReader (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    //connection.execute('select count(name) from reader where name=:username',)
    connection.execute('insert into '+req.body.role+' values (:username, :email, :password)',
    { username: req.body.username, email: req.body.email, password: req.body.password},
    function(err, result){
      if (err){console.error(err.message);
      return;
      }
      console.log(result);
      return;
      //res.send({message: 'success'})

    })
  })
}





function signIn (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    connection.execute('select count(name) from '+req.body.role+' where name=:username and password=:password',
      {username: req.body.username, password: req.body.password},
      function(err, result){
        if(err){console.error(err.message);
          return;
        }
        bool = result.rows[0][0];
        console.log('matches:'+bool);
        return bool;
        if(bool === 0){
          res.status(404);
          res.sendFile(path.resolve('views/index.html'));
        } else { //send to home page
          res.sendFile(path.resolve('views/home.html'));
        }

    })
  })
}

function signInReader (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    connection.execute('select count(name) from reader where name=:username and password=:password',
      {username: req.params.username, password: req.params.password},
      function(err, result){
        if(err){console.error(err.message);
          return;
        }
        bool = result.rows[0][0];
        console.log('matches:'+bool);
        if(bool === 0){
          res.status(404).send({message: 'invalid'});
        } else {
          res.send({username: req.params.username});
        }

    })
  })
}

//This function should check if a username is taken when adding a new publisher
module.exports = r_router;
