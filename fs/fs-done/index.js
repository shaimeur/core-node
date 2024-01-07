const fs = require("fs")


//Blocking : read and write synchrous code :
const textIn =  fs.readFileSync("./txt/input.txt","utf-8")

// console.log(textIn)

// const textOut = `this is what we know about he avocados ${textIn}.\nCreated on ${Date.now()}`

// fs.writeFileSync("./txt/output.txt",textOut)

// console.log("File has been written")

//Non:Blocking  read and write asynchronous code :


fs.readFile("./txt/start.txt","utf-8",(err,data1)=>{
    fs.readFile(`./txt/${data1}.txt`,"utf-8",(err,data2)=>{
        console.log(data2)
        fs.readFile("./txt/append.txt","utf-8",(err,data3)=>{
            console.log(data3)
            fs.writeFile("./txt/newOutput.txt",`${data2} \n ${data3}`,(err)=>{
                    console.log("file written succusffuly!!")
            })
        })
    })

})


