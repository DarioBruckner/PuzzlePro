var express = require("express");
var cors = require("cors");


var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Database with dummy data
var db = {"test@test.at":{"username": "test@test.at","password": "1234", "highscore":"12"}};
db["dario@bruckner.com"] = {"username": "dario@bruckner.com","password": "123457", "highscore":"14"};
db["puzzle@pro.at"] = {"username": "puzzle@pro.at","password": "123457", "highscore":"16"};
db["iamgood@atpuzzles.com"] = {"username": "iamgood@atpuzzles.com","password": "123457", "highscore":"18"};
db["vietze@stefan.at"] = {"username": "vietze@stefan.at","password": "123457", "highscore":"70"};
db["dominik@f.com"] = {"username": "dominik@f.com","password": "123457", "highscore":"22"};
db["webframeworks@isttoll.at"] = {"username": "webframeworks@isttoll.at","password": "123457", "highscore":"24"};
db["werbraucht@APM.at"] = {"username": "werbraucht@APM.at","password": "123457", "highscore":"26"};
db["Bitte@highscore.at"] = {"username": "Bitte@highscore.at","password": "123457", "highscore":"28"};
db["Wer@binIch.at"] = {"username": "Wer@binIch.at","password": "123457", "highscore":"30"};
db["Ichbinschlecht@puzzles.com"] = {"username": "Ichbinschlecht@puzzles.com","password": "123457", "highscore":"10"};

let currentUser;


//Login route that returns the token thats needed for future communitcation 
app.post("/login", function (req, res) {
    if (req.body.usern == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: "You must send a username and password!"
        });

    } else {
        var token = login(req.body.usern, req.body.password);

        if (token != null) {
            currentUser = { "username": req.body.usern, "token": token };


            res.status(200).json({
                message: "Login successful, welcome",
                auttoken: token,
                highscore: db[req.body.usern].highscore,
            });

        } else {
            res.status(500).json({
                message: "Username or password were not found"
            });
        }
    }

});


//get the top 10 datasets based on the highscores 
app.get("/tophighscores", function (req, res, next) {
    let tempdb = JSON.parse(JSON.stringify(db));
    let retary = [];
    let score = 0;
    let tempobj = null;


    //repeats 10 times and scannes the entire database and gets the correct data
    for (var i = 0; i < 10; i++) {
        score = 0;
        for (var element in tempdb) {

            if (tempdb[element]["highscore"] > score) {
                score = tempdb[element]["highscore"];
                tempobj = element;
            }
        }


        //adds dataset to the return array
        retary.push({ position: i + 1, username: tempdb[tempobj]["username"], highscore: tempdb[tempobj]["highscore"] });
        delete tempdb[tempobj];
    }

    res.json(retary);
});

//saves new highscore in DB
app.post("/highscore", function (req, res) {
    if (currentUser != undefined) {
        if (req.body.token == currentUser.token) {
            db[req.body.usern].highscore = req.body.highscore;
            res.status(200).json({
                messgage: "Successfully set new Highscore"
            })
        } else {

            res.status(400).json({
                message: "Error wrong token"
            });
        }
    } else {
        res.status(401).json({
            message: "You have to be logged in to set scores"
        });
    }

});

//signs up a new user to the db 
app.post("/signup", function (req, res) {
    if (req.body.usern == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: "You must send a username and password!"
        });

    } else {
        let checkUser = db[req.body.usern];
        if (checkUser == undefined) {
            db[req.body.usern] = { "username": req.body.usern, "password": req.body.password, "highscore": 0 }
            let token = login(req.body.usern, req.body.password);
            if (token != null) {
                currentUser = { "username": req.body.usern, "token": token };
                res.status(200).json({
                    message: "Signup successful, welcome", auttoken: token
                });
            } else {
                res.status(500).json({
                    message: "Somewent went wrong, ERROR"
                });
                delete db[req.body.usern];
            }


        } else {
            res.status(409).json({
                message: "Accout does already exsist"
            });
        }
    }
});


//logs the user out and deletes the current user
app.post("/logout", function (req, res, next) {
    if (currentUser != undefined) {
        if (req.body.token == currentUser.token) {
            delete currentUser;
            res.status(200).json({
                messgage: "You successfully logged out"
            })
        } else {

            res.status(400).json({
                message: "Error wrong token"
            });
        }
    } else {
        res.status(401).json({
            message: "You have to be logged in first to logout"
        });
    }

});






module.exports = app;



//checks if the password was the correct one
function login(usern, password) {
    let user = db[usern];
    if (user != undefined && user.password == password) {
        let authtoken = Math.random().toString(16).substr(2, 34);
        return authtoken;
    }
    return null;
}