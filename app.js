const express = require('express');
const morgan = require('morgan');

// Create express app
const app = express();

// register ejs
app.set("view engine","ejs");

app.use(morgan('dev'));

// create own custom middleware
// app.use((req,resp,next)=>{
//   console.log("new request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// })

// declare port number
const PORT = 9000;

// listen for request
app.listen(PORT);

// middleware & static files
app.use(express.static('public'));

app.get("/", (req,resp)=>{
  const blogs = [
    { title: "This is a first blog", snippet: "This blogs is fascinating and amazing" },
    { title: "This is a second blog", snippet: "This blog is fascinating and amazing" },
    { title: "This is a third blog", snippet: "This blog is fascinating and amazing" }
  ]
  resp.render("index", { title: "Home", blogs});
});

// app.use((req,resp,next)=>{
//   console.log("in the next middleware");
//   next();
// })

app.get("/about", (req,resp)=>{
  resp.render("about", { title: "About"});
});

app.get("/blogs/create", (req,resp)=>{
  resp.render("create", { title: "Create a New Blog" });
});

app.use((req,resp)=>{
  resp.status(404).render("404", { title: 404 });
})

