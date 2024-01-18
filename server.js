const http = require("http");
const url = require("url")
const port = 8000;
// console.log(http.METHODS.length)

// for(let m of http.METHODS){
//     console.log(m)
// }
const server = http.createServer((req,res)=>{
    const pathName = req.url
    if(pathName === "/" || pathName === '/overview'){

        res.end('hello from Overview!')
    }else if (pathName === '/product'){

        res.end('hello from product!')
    }else{
        res.writeHead(404,{
            "content-type" : "text/html",
            "my-own-header" : "hello-world"
        })
        res.end("<h1>Page not found</h1>")
    }
})

server.listen( port,"127.0.0.1",()=>{
    console.log(`server listen on port :${port}`)
})
