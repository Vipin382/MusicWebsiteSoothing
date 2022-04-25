const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const fs = require('fs');
const ejs = require('ejs')
const mysql = require('mysql');
var bodyParser = require('body-parser');
const multer = require("multer");
require('dotenv/config');
const alert = require('alert')

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const folder_path = path.join(__dirname,"../public/profileImages");

app.use(bodyParser.urlencoded(
    { extended:true }
))

app.use(express.json(static_path));
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path))
app.set("view engine","ejs")
app.set("views",template_path)

// SET STORAGE
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql connected....')
});
app.get('/createdb',(req,res)=>{
    let sql =  'CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('dATABASE CREATED...');
    });
});

//create Table

app.get('/createpoststable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,name VARCHAR(80),email VARCHAR(80),password VARCHAR(9),img LONGBLOB NOT NULL, PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send('Posts table created...');
    })
})
//insert Data
app.post('/register',(req,res)=>{
    let name = req.body.name;
    let password = req.body.password
    let email = req.body.email
    let pic = req.body.pic;
    let post = {name:name,email:email,password:password,img:pic};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql,post,(err,results)=>{
        if(err) throw err;
        res.render('front')
        alert("Registered")
    });
});

// select

app.post('/signin',(req,res)=>{
    let email = req.body.gmail;
    let password = req.body.gpassword;
    console.log(email+" "+password)
    let query = db.query('SELECT * FROM posts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            res.redirect('index');
            console.log(results[0].img)
        } else {
            res.send('Incorrect Username and/or Password!');
        }
        res.end();
    });
});
// module.exports={ 
//     displayImage:function(callback){
//      // check unique email address
//         var sql='SELECT image_name FROM images';
//         db.query(sql,function (err, data, fields) {
//         if(err) throw err
//         return callback(data);
//         })
//     }
// }

// module.exports={
//     displayImage:function(req,res){
//     imageModel.displayImage(function(data){
//      res.render('display-image',{imagePath:data})
//     })    
//     }
// }
app.get("/",(req,res)=>{
    res.render("front");
})
app.get("/searchBar",(req,res)=>{
    res.render("searchBar");
})
app.get("/index",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log("Server is running");
});