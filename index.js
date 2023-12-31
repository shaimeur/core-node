const  http = require("http");

const fs = require("fs");

const path = require("path");

const url = require('url')

const express = require("express")

const app = express();

const port = 8000

// Node Code

// create server with nodeJs Nativelly
http.createServer((req,res)=>{
  res.write("hello")
  res.end();
}).listen(6000)


// read a file from the system using the core module new syntax
fs.readFile('./phpCLI.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});


// read a file from the system synchronus using the core module new syntax


// using Buffer to output result

const data = fs.readFileSync('./hello.txt'); // blocks here until file is read
console.log(data);//writes data in the content.md file to the console










//Express code

// app.get("/home",(req,res)=>{
//   res.send("<h1>Hello world!!</h1>")
// })

// app.listen(port,()=>{console.log(`listen to port ${port}`)})