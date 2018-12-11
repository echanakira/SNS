var faker = require("faker");
var oracledb = require('oracledb');
var express = require("express");
var path = require('path');
var validator = require('express-validator');
const {check, validationResult} = require('express-validator/check')
//oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
var config = {
  user          : "system",
  password      : "ambuya",
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
  //res.sendFile(path.resolve('./views/message.html'));
  res.render('new-message',{
    data: {}, errors: {} })
  //addMessage(req, res);
})
p_router.post("/:username/new-message", [
  check('title')
    .isLength({min: 1})
    .withMessage('Title is missing or taken'),
    //.equals(checkTitleOpen('title'),'open','Title is taken. Select something more unique.'),
  check('message')
    .isLength({min: 1})
    .withMessage('Message is required')
    .trim(), //trims whitespace
  check('start_dt')
    .not().isEmpty()
    .withMessage('start must be before end'),
  check('end_dt')
    .not().isEmpty()
    .withMessage('need end date and time'),
  check('category')
    .isLength({min: 1})
    .withMessage('need category'),
  check('lat')
    .isDecimal()
    .withMessage('need lat as decimal'),
  check('long')
    .isDecimal()
    .withMessage('need long as decimal'),
  check('extend')
    .isDecimal()
    .withMessage('need extend as decimal')],function(req,res){
  //renders new-message form
  //res.sendFile(path.resolve('./views/home.html'));

  const errors = validationResult(req);
  console.log(errors.mapped());
  res.render('new-message', {
    data: req.body,
    errors: errors.mapped()
  }

  )
  //res.send("works");
  if(errors.mapped = {}){ if (
    addMessage(req, res));
    console.log('flag');
    res.redirect('/pub/'+req.params.username+'/home');}
})

p_router.get("/:username/home", function(req,res){
  //res.sendFile(path.resolve('./views/webIndex.html'));
  res.render('home',{
    data:{}
  })
})

p_router.get("/search", function(req, res, next){
  res.render('websearch',{
    data: {}, errors: {} })
  })
p_router.post("/search",
[check('title')
    .trim(),
  check('category')  .trim()], function(req, res){
  const errors = validationResult(req);
  console.log(errors.mapped());
  res.render('websearch', {
    data: req.body,
    errors: errors.mapped()
  })
})

p_router.get("/:username/categories", function (req,res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return err;
    }
    connection.execute('select name from category',
    function(err, result) {
      if (err) {console.error(err.message);
      return err;
    }
    console.log('json parse result.rows: '+JSON.stringify(result.rows));
    var cat_json = (result.rows); //send json to other function
    var cat_arr = [].concat.cat_json;
    console.log(cat_json);
    res.render('category-view',{
      catData: cat_json, data: {}
    })
    })
})})
p_router.post("/:username/new-category", function(req,res){
  addCat(req,res);
  res.redirect('categories');
})
function checkTitleOpen(title){
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return '';
    }
    connection.execute('select count(mid) from message where mid=:title',
    {title: title},
    function(err, result) {
      if (err) {console.error(err.message);
      return '';
    }
    console.log(result);
    if (result.rows[0][0] === 0) {
      return 'open';
    } else {//res.write("<html><h1>Taken</h1></html>");
      //res.sendFile(path.resolve('./views/webIndex.html'));
      return '';}
    })
  })
}
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
          res.redirect('/pub/'+req.query.username+'/home');
          return;
        }

    })
  })
}

function addMessageCat(req, res) {
  oracledb.getConnection(config, function(err,connection){
    if(err){console.error(err.message)
      return;
    }

    connection.execute('insert into messagecategory values (:mid, :cat_id )',
    {mid: req.body.title, cat_id: req.body.category }, function(err, result) {
      if (err) {console.error(err.message);
      return;
    }
    console.log(result);
    return; //entry has been added to messagecategory table
    })
  })
}

function addCat (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return;
    }
    connection.execute('insert into category values (:cat)',{cat: req.body.category},
    function(err,result){
      if(err){
        console.log('category already present')
        return;} //means it was already in the table
      console.log(result);
      return; //added successfully
    })
  })
}

function addMessage (req, res) {
  oracledb.getConnection(config, function(err, connection){
    if(err){console.error(err.message);
      return(err);
    }
    //needs MID, content, time_entered, start_time, end_time, long, lat, extend, publisher_id
    //mid can be a hash from vals
    console.log(formatDate(req.body.start_dt));
    console.log(formatDate(req.body.end_dt));
    console.log(formatDate(new Date().toISOString().substring(0,16)));

    var req_url_params = req.url.split('/');
    console.log(req_url_params);
    addCat(req,res);
    connection.execute('insert into message values (:mid, :content, TO_TIMESTAMP(:time_ent,\'YYYY-MM-DD HH24:MI\'), TO_TIMESTAMP(:sdt,\'YYYY-MM-DD HH24:MI\'), TO_TIMESTAMP(:edt,\'YYYY-MM-DD HH24:MI\'), :lo, :la, :ex, :publ, null, null)',
    { mid: req.body.title, content: req.body.message,
      time_ent: formatDate(new Date().toISOString().substring(0,16)),
      sdt: formatDate(req.body.start_dt), edt: formatDate(req.body.end_dt),
      lo: req.body.long, la: req.body.lat, ex: req.body.extend,
      publ: req_url_params[2]},
    function(err,result){
      if (err){console.error(err.message);
      return(err);
      }
      //add cat
      addMessageCat(req, res); //add to message cat
      //res.redirect('/pub/'+req.params.username+'/home');
      console.log(result);
      //return;
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
