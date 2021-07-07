var express = require("express");
var cors = require("cors");


var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var name = "hallo@test.at";
var db = {"test@test.at":{"username": "test@test.at","password": "1234", "highscore":"12000"}};
db["test2@test.at"] = {"username": "test2@test.at","password": "12345", "highscore":"13000"};
db[name] = {"username": name,"password": "123457", "highscore":"14000"};

let currentUser;

app.get("/", function(req, res){
    res.send("get hello world");
});



app.post("/login", function(req, res){
    if(req.body.usern == undefined || req.body.password == undefined){
        res.status(400).json({
            message: "You must send a username and password!"
        });
        
    }else{
        var token = login(req.body.usern, req.body.password);

        if(token != null){
            currentUser = {"username": req.body.usern, "token": token};
           

            res.status(200).json({
                message: "Login successful, welcome", auttoken: token 
            });
            
        }else{
            res.status(500).json({
                message: "Username or password were not found"
            });
        }
    }
    next();
});

app.post("/highscore", function(req, res) {
    if(currentUser != undefined){
        if(req.body.token == currentUser.token){
            db[req.body.usern].highscore = req.body.highscore;
            res.status(200).json({
                messgage: "Successfully set new Highscore"
            })
        }else{
          
            res.status(400).json({
                message: "Error wrong token"
            });
        }
    }else{
        res.status(401).json({
            message: "You have to be logged in to set scores"
        });
    }
    next();
});

app.post("/signup", function(req, res){
    if(req.body.usern == undefined || req.body.password == undefined){
        res.status(400).json({
            message: "You must send a username and password!"
        });
        
    }else{
        let checkUser = db[req.body.usern];
        if(checkUser == undefined){
            db[req.body.usern] = {"username": req.body.usern, "password": req.body.password, "highscore": 0}
            let token = login(req.body.usern, req.body.password);
            if(token != null){
                currentUser = {"username": req.body.usern, "token":token};
                res.status(200).json({
                    message: "Signup successful, welcome", auttoken: token 
                });
            }else{
                res.status(500).json({
                    message: "Somewent went wrong, ERROR"
                });
                delete db[req.body.usern];
            }


        }else{
            res.status(409).json({
                message: "Accout does already exsist"
            });
        }
    }
});

app.post("/logout", function(req,res,next){
    if(currentUser != undefined){
        if(req.body.token == currentUser.token){
            delete currentUser;
            res.status(200).json({
                messgage: "You successfully logged out"
            })
        }else{
          
            res.status(400).json({
                message: "Error wrong token"
            });
        }
    }else{
        res.status(401).json({
            message: "You have to be logged in first to logout"
        });
    }
    next();
});



app.get("/highscores", function(req,res,next){
    
});



module.exports = app;

function login(usern, password){
    let user = db[usern];
    console.log(user + " " + usern + " " + password);
    if(user != undefined && user.password == password){
        let authtoken = Math.random().toString(16).substr(2,34);
        return authtoken;
    }
    return null;
}