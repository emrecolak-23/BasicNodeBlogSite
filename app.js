const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require("./models/blog");

// Create express app
const app = express();

// connect to mongo db
const dbURI = "mongodb+srv://emco:emco3232@nodetuts.iuulr.mongodb.net/nodetuts?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{ 
  // declare port number
  const PORT = 10000;
  // listen for request
  app.listen(PORT);} )
.catch((err)=>{ console.log(err); })

// register ejs
app.set("view engine","ejs");

app.use(morgan('dev'));


// mongoose and mongo sandbox routes
// app.get("/add-blog", (req,resp)=>{
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "About my new blog",
//     body: "More about my new blog"
//   });
//   blog.save()
//     .then((result)=>{
//       resp.send(result);
//     }).catch((err)=>{
//       console.log(err);
//     })
// })

// app.get("/all-blogs", (req,resp)=>{
//   Blog.find()
//     .then((result)=>{
//       resp.send(result);
//     }).catch((err)=>{
//       console.log(err);
//     })
// })

// app.get("/single-blog", (req,resp)=>{
//   Blog.findById('620830becdda24249ef7ac51')
//     .then((result)=>{
//       resp.send(result);
//     }).catch((err)=>{
//       console.log(err);
//     })
// })

// create own custom middleware
// app.use((req,resp,next)=>{
//   console.log("new request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// })



// middleware & static files
app.use(express.static('public'));

app.get("/", (req,resp)=>{
  resp.redirect("/blogs")
});

app.get("/blogs", (req,resp)=>{
  Blog.find().sort({createdAt:-1})
    .then((result)=>{
      resp.render("index",{title: "All Blogs", blogs: result});
    }).catch((err)=>{
      console.log(err);
    })
})

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

