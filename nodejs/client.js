const http = require("http");

var readline = require('readline');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var options = {
    host: 'localhost',
    port: 8080,
    path: '/upload',
    method: 'POST'
};


var id = {
    username: "ammasum"
}

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log(chunk);
    });
});
  
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

var body = JSON.stringify(id);

req.write(body); 

// write data to request body

rl.on('line', function(line){
    let msgObj = {
        message: line
    }
    let msg = JSON.stringify(msgObj);
    req.write(msg); 
});