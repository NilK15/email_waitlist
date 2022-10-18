var express = require('express'); // library to help create server to listen for and send HTTP/CRUD requests/responses
var mysql = require('mysql2'); // library to help connect and query mysql database
var bodyParser = require('body-parser'); // takes post text and makes them into accessible js, aka objects (key,value pairs) (JSON)
var app = express(); // assign express as a function to use its functionality

app.set("view engine", "ejs"); // lets express know to which view engine to use (checks views folder for files with .ejs extension)
//app.use(bodyParser.urlencoded({extended: true})); // lets express know to use bodyParser to parse the post data text into JSON
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// creating the mysql connection using the mysql connection port (localhost), username/password, and database
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'password',
  database : 'join_us'
});

app.get("/", function (req,res) {
    //find count of users in db
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        if (err) throw err;
        var count = results[0].count;
        //res.send("We have " + count + " users in our database");
        res.render("home", {data: count});
    });
    //respond with that count
    console.log("Someone requested us!")
});

app.post("/register", function (req,res) {
    // console.log("POST request sent!");
    var person = { 
        email: req.body.email
    };
    connection.query("INSERT INTO users SET ?", person, function (err,result) {
       if (err) throw err;
    //    res.send("Thank you for registering!");
       res.redirect("/");
    });
});

app.get("/joke", function (req,res) {
    var joke = "<strong>Why did the chicken cross the road? Because it <em>wanted</em> to?<strong>"
    res.send(joke);
});

app.get("/number", function (req,res) {
    var random_num = Math.floor(Math.random() * 10) +1
    res.send(random_num.toString());
})

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});