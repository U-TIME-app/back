var express = require('express');
var app = express();
var bodyParser =  require("body-parser");  
var fs = require('fs');
var mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test', 
}); 
connection.connect();
app.post('/adduser', function (req, res) {
  var nickname=req.nody.nickname;
  var phone=req.body.phone;
  var password=req.body.password;
  var  addSql = 'INSERT INTO userinfo(nickname,phone,password) VALUES(?,?,?)';
  var  addSqlParams = [nickname, phone,password];
  connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     return;
    }        
   console.log('--------------------------INSERT----------------------------');
   console.log('INSERT ID:',result);        
   console.log('-----------------------------------------------------------------\n\n');  
});
})
 
app.post('/login', function (req, res) {
  var phone=req.body.phone;
  var password=req.body.password;
  var  addSql = 'SELECT password from userinfo where phone=? and password =?';
  var  addSqlParams = [phone,password];
  connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     return;
    }        
   console.log('--------------------------INSERT----------------------------');
   console.log('login:',result);        
   console.log('-----------------------------------------------------------------\n\n');  
});
    res.send('Hello GET');
 })

app.post('/up',function (req, res) {
   console.log("backup");
   var content=req.body.content;
   var userid=req.body.userid;
   fs.writeFileSync(userid,length);
   res.send('Hello POST');
})
app.get('/',function(req,res){
  var  addSql = 'SELECT * from userinfo';                                     
  connection.query(addSql,function (err,result){
  if(err){ 
    console.log( err.message);
    return;
  }
   console.log( result);
  });
})

 
app.post('/down', function (req, res) {
  var userid=req.body.userid;
  var data = fs.readFileSync(userid, 'utf8');
  console.log(data);
 })
 
var server = app.listen(3389, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})