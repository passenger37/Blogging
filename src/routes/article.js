const express=require("express");

const router=express.Router();

const article =require("../controllers/article");

router.get("/",article.homePage); //TODO: load all article in here with passing article ID,comments,upvote,downvote related to it

router.get("/addArticle",article.addArticle);

router.post("/createarticle",article.createArticle);

router.post("/upvote",article.upvote);

router.post("/downvote",article.downvote);

router.post("/comment/:articleId",article.comments);//TODO:looked in ot he logic of controller for post

router.get("/editarticle/:articleId",article.editArticle);

router.post("/editarticle/:articleId",article.updateArticle);

router.get("/deletearticle/:articleId",article.deleteArticle);

module.exports =router;