//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const load=require("lodash");
const homeStartingContent = "WELCOME TO SAYON'S PERSONAL BLOG SPOT";
const aboutContent = "I am a Sophomore Computer Science Undergad in HITK";
const contactContent = "Information";

const app = express();
let posts=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  
  res.render("home",{start:homeStartingContent,posts:posts
  });
  
});
app.get("/contact",function(req,res){
  res.render("contact",{
    contactContent:contactContent
  })
})
app.get("/about",function(req,res){
  res.render("about",{
    aboutContent:aboutContent
  });
});
app.get("/compose",function(req,res){
  res.render("compose");
 
});

app.post("/compose",function(req,res){
  let body=req.body.post_body;
  let title=req.body.post_title;
  let post={
    body_post:body,
    body_title:title
  };
  posts.push(post);
  res.redirect("/");

 
});


app.get("/posts/:post_name",function(req,res){
  for(var i=0;i<posts.length;i++){
    let lower=load.lowerCase(req.params.post_name);
    let check=load.lowerCase(posts[i].body_title);
  if(lower===check){
      res.render("post",{title:posts[i].body_title,
      body:posts[i].body_post});
  }
  else{
    console.log("Match not found");
  }
}
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
