const http = require("http");
const fs = require("fs")
const url = require("url")
const port = 8000;
// console.log(http.METHODS.length)

// for(let m of http.METHODS){
//     console.log(m)
// }
const data = fs.readFileSync(`${__dirname}/starters/fs-starter/dev-data/data.json`)

 JSON.parse(data)

const server = http.createServer((req,res)=>{
    const pathName = req.url
    if(pathName === "/" || pathName === '/overview'){

        res.end('hello from Overview!')
    }else if (pathName === '/product'){

        res.end('hello from product!')
    }else if (pathName === "/api"){
        //  fs.readFile("./starters/fs-starter/dev-data/data.json",'utf-8',(err,data)=>{
        //     if(err){
        //         res.end("errror!!")
        //     }
        //      const productData =  JSON.parse(data)
                res.writeHead(200,{
                    "Content-type" : "application/json"
                })
             res.end(data)

    }else{
        res.writeHead(404,{
            "Content-type" : "text/html",
            "my-own-header" : "hello-world"
        })
        res.end("<h1>Page not found</h1>")
    }
})

server.listen( port,"127.0.0.1",()=>{
    console.log(`server listen on port :${port}`)
})
