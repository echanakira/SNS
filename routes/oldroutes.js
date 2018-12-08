var faker = require("faker");
var oracledb = require('oracledb');
var path = require('path');
oracledb.autoCommit = true;
var config = {
  user          : "ORDS_PUBLIC_USER",
  password      : "oracle",
  connectString : "LOCALHOST:1521/XE"
}
var appRouter = function (app) {

  app.get("/", function (req, res) {
    //res.status(200).send({ message: 'Welcome to our restful API' });
    res.sendFile('./views/index.html');
  });
//listen on port -> get request -> route to function
  app.get("/pub",function (req,res) {
    res.sendFile(path.resolve('./views/webIndex.html'));
  })

  app.get("/pub/sign-in")
 app.get("/readers", function(req, res){
   allReaders(req,res)
 })

//for testing purposes only
 app.get("/random-reader", function(req, res){
   addRandomReader(req, res)
 })

//gets user info, compares it to info from database, and then signs them in if
//everything matches
 app.get("/sign-in", function(req, res){
   console.log(req.body);
   signIn(req,res);
   //add actual appropriate response
   //res.json(req.body)
 })

 app.post("/sign-in", function(req,res){
   res.json(req.body);

 })

 app.post('/new', function(req,res){
   console.log(req.body);
   addReader_checkExists(req, res);
   res.sendFile(path.resolve('views/index.html'))

   //res.json(req.body)
 })

app.post('/:username/new-message', function(req,res){
  console.log(req.body);
})
 //should take request from mobile app
 app.get("/login/:username-:password", function(req, res){
   console.log(req.body);
   if(signInReader(req, res)>0){
     res.json(req.body.username)
   }
 })

 //app.post()

}

module.exports = appRouter;

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
function checkPubExists (req, res){
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    connection.execute('select count(name) from publisher where name=:username',
    {username: req.body.username},
    function(err, result) {
      if (err) {console.error(err.message);
      return;
    }
    console.log(result);
    if (result.rows[0][0] === 0) {
      addpub(req, res);
    } else {res.send({message: 'username taken'});} //needs to be html not json
    })
  })
}


function addPub(req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    //connection.execute('select count(name) from reader where name=:username',)
    connection.execute('insert into publisher values (:username, :email, :password)',
    { username: req.body.username, email: req.body.email, password: req.body.password},
    function(err, result){
      if (err){console.error(err.message);
      return;
      }
      console.log(result);
      //should send to login page
      return;
      //res.send({message: 'success'})
    })
  })
}

function signInPub(req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    connection.execute('select count(name) from publisher where name=:username and password=:password',
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
          //take to "home" or new messaage page
          res.send({username: req.params.username});
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
    connection.execute('insert into message values (:MID, :content, :time_entered, :start_dt, :end_dt, :long, :lat, :publisher)',
    { MID: 0, content: req.body.message_body, time_entered: req.timestamp, start_dt: req.body.start_dt, end_dt: req.body.end_dt, long: 0, lat: 0, publisher: req.params.username },
    function(err,result){
      if (err){console.error(err.message);
      return;
      }
      console.log(result);
      return;
    })
  })
}
