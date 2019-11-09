const http = require("http");

var readline = require('readline');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var connectionArray = [];

var port = 8080
const server = http.createServer(function(req, res){
    let connectionUsername = "";
    req.setEncoding('utf8');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    rl.on('line', function(line){
        res.write(line); 
    });
    req.on('data', data => {
        let obj = JSON.parse(data);
        if(obj.hasOwnProperty("username")){
            connectionArray.push({
                username: obj.username,
                request: req,
                response: res
            });
            connectionUsername = obj.username;
        }
        if(obj.hasOwnProperty("message")){
            connectionArray.forEach(connection => {
                if(connection.username != connectionUsername){
                    connection.response.write(`${connectionUsername}: ${obj.message}`);
                }
            });
        }
    });
    req.on('close', () => {
        connectionArray = connectionArray.filter(connection =>{
            if(connection.username == connectionUsername){
                return false;
            }
            return true;
        });
    })
});

server.listen(port, ()=>{
    console.log(`Server start at http://localhost:${port}`);
});