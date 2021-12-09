const { request } = require("express");
var express = require("express");
var apiServer = express();
var fs = require("fs");

var port = 3000;
var host = "localhost";

apiServer.listen(port, host, ()=>{
    console.log("server running at http://%s:%d", host, port);
});

apiServer.get("/", (request, response)=>{
    console.log("sono in get /");
    response.send("<h1>Hello client you're in the home</h1>");
});

apiServer.get("/Diego", (request, response)=>{
    console.log("request get name");
    response.send("<h1>Siliprandi</h1>");
});

apiServer.get("/mioNome", (request, response)=>{
    response.send("Hi, your name is: "+request.query.name);
});

// http://localhost:3000/somma?a=34&b=35
apiServer.get("/somma", (request, response)=>{
    response.send("Result = "+ (parseInt(request.query.a) + parseInt(request.query.b))); 
});  //We can also use '- -' to do an addition without the parseInt

// http://localhost:3000/student?id=1
apiServer.get("/student", (request, response)=>{
    console.log("student id: ", request.query.id);
    //read file
    fs.readFile("studenti.json", (err, data) =>{
        if (err){
            console.log("error: " + err);
        } else {
            var students = JSON.parse(data);
            response.send(
                students.find(x => x.id === request.query.id)
            );
        }
    });
});

// http://localhost:3000/newStudent?surname=Amati&name=Mattia&id=3
apiServer.get("/newStudent", (request, response)=>{
    var dt = {'surname': request.query.surname, 'name': request.query.name, 'id': request.query.id};
    fs.readFile("studenti.json", (err, data) =>{
        if (err){
            console.log("error: " + err);
        } else {
            var datajson = JSON.parse(data);
            datajson.push(dt);
            fs.writeFile('studenti.json', JSON.stringify(datajson), {flag: 'a'}, err => {});
        }
    });
});