const http = require("http");
const fs = require("fs")
const url = require("url")
const port = 8000;
// console.log(http.METHODS.length)

// for(let m of http.METHODS){
//     console.log(m)
// }


const replaceTemplate = (template,product)=>{
        let output = template.replace(/{%PRODUCTNAME%}/g,product.productName)

        output = output.replace(/{%IMAGE%}/g,product.image)
        output = output.replace(/{%PRICE%}/g,product.price)
        output = output.replace(/{%FROM%}/g,product.from)
        output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
        output = output.replace(/{%QUANTITY%}/g,product.quantity)
        output = output.replace(/{%DESCRIPTION%}/g,product.description)
        output = output.replace(/{%ID%}/g,product.id)

        if(!product.organic){
            output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
        }

        return output
    }

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')

const data = fs.readFileSync(`${__dirname}/fs/dev-data/data.json`,'utf-8')
 const dataObj = JSON.parse(data)

const server = http.createServer((req,res)=>{

    const {query,pathname} = url.parse(req.url,true)

    // OVERVIEW PAGE :

    if(pathname === "/" || pathname === '/overview'){
        res.writeHead(200,{
            "Content-type" : "text/html"
        })

       const cardHtml =   dataObj.map((item)=>replaceTemplate(tempCard,item)).join('')
        // console.log(cardHtml)
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output)
    }
        // Product Page
    else if (pathname === '/product'){
        res.writeHead(200,{
            "Content-type" : "text/html"
        })
        const product = dataObj[query.id]

        const output = replaceTemplate(tempProduct,product)

        // console.log(query)

        res.end(output)
    }
        // API
    else if (pathname === "/api"){
        //  fs.readFile("./starters/fs-starter/dev-data/data.json",'utf-8',(err,data)=>{
        //     if(err){
        //         res.end("errror!!")
        //     }
        //      const productData =  JSON.parse(data)
                res.writeHead(200,{
                    "Content-type" : "application/json"
                })
             res.end(data)

    }
        // Not Found
    else{
        res.writeHead(404,{
            "Content-type" : "text/html"
        })
        res.end("<h1>Page not found</h1>")
    }
})

server.listen( port,"127.0.0.1",()=>{
    console.log(`server listen on port :${port}`)
})
