const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
const pass = require(__dirname+'/key.js');

const homeStartingContent = "Hello i'm Sabiq, currently i has study about node js, mongosee and express to develop this project, enjoy this project, rate me if you like or dislike this project";
const aboutContent = "this is personal blog web using atlas mongoDB, nodejs and express. please rate me...";

const app = express();

mongoose.connect(pass.getPass(), {useNewUrlParser: true}); //connect to DB

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
  Post.find({}, (err, posts)=>{
    res.render('index', {
      titleHm: homeStartingContent,
      posts: posts
    });
  })
});

app.get('/about', (req, res)=>{
  res.render('about',{titleAbt: aboutContent})
});

app.get('/contact', (req, res)=>{
  res.render('contact')
});

app.get('/compose', (req, res)=>{
  res.render('compose')
});

app.post('/compose', (req, res)=>{
  let titlePost = req.body.postTitle;
  let body = req.body.postBody;
  const post = new Post({
    title: titlePost,
    content: body
  });

  //posting.push(post)
post.save((err)=>{
  if(!err){
    res.redirect('/'); 
  }
});
});


app.get('/post/:postId', (req, res)=>{
  const requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId}, (err, post)=>{
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, ()=>{
  console.log("server listening on port");
});
