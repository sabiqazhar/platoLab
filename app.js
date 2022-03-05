const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')

const homeStartingContent = "Hello i'm Sabiq, currently i has study about node js, mongosee and express to develop this project, enjoy this project, rate me if you like or dislike this project";
const aboutContent = "this is personal blog web using atlas mongoDB, nodejs and express. please rate me...";

const app = express();

mongoose.connect("mongodb+srv://admin-sabiq:sabiq2001@cluster0.wwqbf.mongodb.net/blogDB", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true}); //connect to DB

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', (req, res)=>{
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







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
