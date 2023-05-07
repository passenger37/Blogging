const Article=require("../models/article");
const Upvote=require('../models/upvote');
const Downvote=require('../models/downvote');
const Comment=require("../models/comments");

exports.homePage=((req,res,next)=>{
    Article.find({})
    .then((article)=>{
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(article);
        res.render('homepage/homepage',
        {isAuthenticated:req.session.isAuthenticated,
         message:req.flash("message"),
         blogs:article});
    })
});

exports.addArticle=(req,res,next)=>{
    return res.render('article/createArticle',{csrfToken:req.csrfToken()});
}

exports.createArticle=(req,res,next)=>{
    console.log(req.session);
    const text=req.body.text;
    const entry=req.body.entry;
    if (req.session.isAuthenticated){
        const article=new Article({
            text:text,
            owner:req.session.user,
            entry:entry,
        });
        article.save();
        req.flash("message","Post is created Successfully !!")
    }
    res.redirect("/");
}

exports.upvote=(req,res,next)=>{
    const up=req.body.upvote;
    const article=req.body.article;
    if (req.session.isAuthenticated || up!=0){
            const upvote=new Upvote({
                owner:req.session.user,
                entry:article,
                vote:up,
            }) 
            upvote.save();
    }
    else{
        Upvote.findByIdAndRemove({entry:article})
    }
    return res.redirext("/");
}

exports.downvote=(req,res,next)=>{
    const down=req.body.downvote;
    const article=req.body.article;
    if (req.session.isAuthenticated || down!=0){
            const downvote=new Upvote({
                owner:req.session.user,
                entry:article,
                vote:down,
            }) 
            downvote.save();
    }
    else{
        Downvote.findByIdAndRemove({entry:article})
    }
    return res.redirext("/");
}

exports.comments=(req,res,next)=>{
    const comment=req.body.comment;
    const article=req.body.article;
    if(req.session.isAuthenticated){
        const comments=Comment({
            owner:req.session.user,
            text:comment
        })
        comment.save();
        req.flash("message","Comment on the post !!")
    }
    return res.redirext("/");
}