var express = require("express");
var apiServer = express();

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

apiServer.get("/somma", (request, response)=>{
    response.send("Result = "+ (parseInt(request.query.a) + parseInt(request.query.b))); 
});  //We can also use '- -' to do an addition without the parseInt