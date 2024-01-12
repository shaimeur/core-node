const http = require("http");
const port = 8000;
// console.log(http.METHODS.length)

// for(let m of http.METHODS){
//     console.log(m)
// }
const server = http.createServer((req,res)=>{
    res.end('hello from server!')
})

server.listen( port,"127.0.0.1",()=>{
    console.log(`server listen on port :${port}`)
})
