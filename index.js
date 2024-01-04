var express = require("express")
var bodyParser = require("body-parser")
const mongoose = require('mongoose');


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

//connect the database

mongoose.connect('mongodb+srv://user:user123@registrationform.eorjglb.mongodb.net/?retryWrites=true&w=majority');



var db = mongoose.connection;

db.on('error', ()=>console.log("error in connecting to database"));
db.once('open', ()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");