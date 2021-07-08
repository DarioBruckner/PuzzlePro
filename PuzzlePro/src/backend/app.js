var express = require("express");
var cors = require("cors");


var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



var db = {"test@test.at":{"username": "test@test.at","password": "1234", "highscore":"12"}};
db["hallo@test.at1"] = {"username": "hallo@test.at1","password": "123457", "highscore":"14"};
db["hallo@test.at2"] = {"username": "hallo@test.at2","password": "123457", "highscore":"16"};
db["hallo@test.at3"] = {"username": "hallo@test.at3","password": "123457", "highscore":"18"};
db["hallo@test.at4"] = {"username": "hallo@test.at4","password": "123457", "highscore":"20"};
db["hallo@test.at5"] = {"username": "hallo@test.at5","password": "123457", "highscore":"22"};
db["hallo@test.at6"] = {"username": "hallo@test.at6","password": "123457", "highscore":"24"};
db["hallo@test.at7"] = {"username": "hallo@test.at7","password": "123457", "highscore":"26"};
db["hallo@test.at8"] = {"username": "hallo@test.at8","password": "123457", "highscore":"28"};
db["hallo@test.at9"] = {"username": "hallo@test.at9","password": "123457", "highscore":"30"};

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
   
});


app.get("/tophighscores", function(req,res,next){
    let tempdb = JSON.parse(JSON.stringify(db));
    let retary = [];
    let score = 0;
    let tempobj = null;
        


    for(var i = 0; i < 10; i++){
        score = 0;
        for(var element in tempdb){
            
            if(tempdb[element]["highscore"] > score){
                score = tempdb[element]["highscore"];
                tempobj = element;
            }
        }

        

        retary.push({position: i+1, username: tempdb[tempobj]["username"], highscore: tempdb[tempobj]["highscore"]});
        delete tempdb[tempobj];
    }
    
    res.json(retary);
});


app.post("/highscore", function(req, res) {
    if(currentUser != undefined){
        if(req.body.token == currentUser.token){
            db[req.body.usern].highscore = req.body.highscore;
            console.log(db[req.body.usern]);
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