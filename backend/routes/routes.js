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
  /*app.

  app.get("/user", function (req, res) {
    var data = ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    });
    res.status(200).send(data);
  });

 app.get("/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);

   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });*/
 app.get("/readers", function(req, res){
   allReaders(req,res)
 })

 app.get("/random-reader", function(req, res){ 
   addRandomReader(req, res)
 })

 app.get("/sign-in", function(req, res){
   res.sendFile('./views/index.html')
 })

 app.post('/new', function(req,res){
   console.log(req.body);
   addReader(req, res);
   res.json(req.body)
 })
/*oracledb.getConnection(config, function(err, connection){
  if (err) {
    console.error(err.message);
    return;
  }

  connection.execute('select * from reader',
    function(err, result){
      if(err) {
        console.error(err.message);
        return;
      }
      app.get("/reader", function (req, res) {
       res.json({page:result})
    })
  })
})*/
/*  app.get("/reader", function (req, res){
    let conn;

    try {
      conn = oracledb.getConnection(config);
      const result = conn.execute('select * from reader');
      res.json({page: result});

    } catch (err) {
      console.log("broken",err);
    } finally {
      return
    }
  });*/
}

module.exports = appRouter;

function allReaders (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute('select * from reader',
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

function addReader (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    connection.execute('insert into reader values (:id, :username, :email, :password)',
  {id: faker.random.number(), username: req.body.username, email: req.body.email, password: req.body.password},
    function(err, result){
      if (err){console.error(err.message);
      return;
      }
      console.log(result);
    }
    )
  })
}
