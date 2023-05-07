const express=require("express");
const path = require('path');

const session=require("express-session");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const multer = require('multer');
const MongodbStore=require("connect-mongodb-session")(session);
const flash=require("connect-flash");
const csrf=require("csurf");

MONGODB_URI='mongodb+srv://passenger37:YGvlU8LGYBTEa1Ls@blogging.0lx6fdk.mongodb.net/Blogging?retryWrites=true&w=majority';

const app=express();

const store=MongodbStore({
  uri:MONGODB_URI,
  collection:"sessions"

})

const csrfProtection = csrf();

const ArticleRoutes=require("./src/routes/article");
const UserRoutes=require("./src/routes/user");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"adghgjkgjfhdgsfsaasdgdhjf",
  resave:false,
  saveUninitialized:false,
  store:store
}));

app.use(csrfProtection);
app.use(flash());

app.use(UserRoutes);
app.use(ArticleRoutes);

mongoose.connect(MONGODB_URI)
                .then(result=>{
                    app.listen(3000);
                    console.log("Connected..");
                })
                .catch(err=>{
                    console.log(err);
                    console.log("Didn't connect to mongodb...");
                })