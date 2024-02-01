let http = require('http')
let fs = require("fs")
let multer = require("multer")

/*
intall multer before check multer upload

*/


const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'image')


  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)

  }





})

const upload = multer({storage: storage})


let server =http.createServer((req,res)=>{
  if (req.url === "/") {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("This is Home Page");
    res.end();  
  }

 else if (req.url === "/about") {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("This is About Page");
    res.end();  
  }

  else if (req.url === "/contact") {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("This is Contact Page");
    res.end();  
  }

  else if (req.url === "/file-write"){
    let fname= "demo.txt"
    let dtext= "hello world"

    fs.writeFile(fname, dtext, (err) => {
      if (err) {
        console.error(err);
        res.end('Failed to create the file');
      } else {
        console.log('File created successfully');
        res.end('File created successfully');
      }
    })



  }

  else if(req.url==="/upload"){
    upload.single('picture') (req,res,(err)=>{
      if (err){
        res.end("failed")
      }
      else{
        res.end("success")
      }



    })



  }
  
    
    
  


})



const port = 5500;
const hostname = 'localhost';

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

