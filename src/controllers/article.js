const Article=require("../models/article");
const Upvote=require('../models/upvote');
const Downvote=require('../models/downvote');
const Comment=require("../models/comments");

exports.homePage=((req,res,next)=>{
    Article.find({}).populate('owner','name')
    .then(async (articles)=>{
        let blogs=[];
        for(let article of articles){
            let comment =await Comment.find({"article":article._id})
            blogs.push({article:article,comment:comment});
        }
        return res.render('homepage/homepage',
        {isAuthenticated:res.locals.isAuthenticated,
            message:req.flash("message"),
            blogs:blogs,
            csrfToken:res.locals.csrfToken,
            user:req.session.user});
        });
    })

exports.addArticle=(req,res,next)=>{
    return res.render('article/createArticle',{csrfToken:res.locals.csrfToken,user:req.session.user});
}

exports.createArticle=(req,res,next)=>{
    console.log(req.session);
    const title=req.body.text;
    const entry=req.body.entry;
    if (res.locals.isAuthenticated){
        const article=new Article({
            title:title,
            owner:req.session.user,
            entry:entry,
        });
        article.save();
        req.flash("message","Post is created Successfully !!")
    }
    res.redirect("/");
}

exports.editArticle=(req,res,next)=>{
    Article.findById(req.params.articleId).populate('owner','name')
    .then(article=>{
        console.log(article,req.session.user);
        return res.render("article/editArticle.ejs",{csrfToken:res.locals.csrfToken,article:article,user:req.session.user});
    })
}

exports.updateArticle=(req,res,next)=>{
    Article.findById(req.params.articleId)
    .then(article=>{
            article.entry=req.body.entry
            article.save()
            req.flash("message","Post Updated Successfully !!")
            return res.redirect("/");
        })
}

exports.deleteArticle=(req,res,next)=>{
    Article.findByIdAndRemove(req.params.articleId).then(()=>{
        Comment.deleteMany({"entry":req.params.articleId}).then(()=>{
            req.flash("message","Post Deleted Successfully !!");
            return res.redirect("/");
        })
    }
    )
}

exports.upvote=async (req,res,next)=>{
    if(req.session.isAuthenticated){
        let upVote=await Upvote.find({"entry":req.body.articleId,"owner":req.session.user});
        console.log(upVote.length);

        if (upVote.length>=1){
            await Upvote.deleteOne({"entry":req.body.articleId,"owner":req.session.user})
        }
        else {
            Article.findById(req.body.articleId)
            .then(article=>{
                console.log(article);
                const upvote=new Upvote({
                    owner:req.session.user,
                    entry:article,
                }) 
                upvote.save();
            })
        }
    }
    return res.redirect("/");
}

exports.downvote=async (req,res,next)=>{
    if(req.session.isAuthenticated){
        let downVote=await Downvote.find({"entry":req.body.articleId,"owner":req.session.user});
        console.log(downVote.length);

        if (downVote.length>=1){
            await Downvote.deleteOne({"entry":req.body.articleId,"owner":req.session.user})
        }
        else {
            Article.findById(req.body.articleId)
            .then(article=>{
                console.log(article);
                const downVote=new Downvote({
                    owner:req.session.user,
                    entry:article,
                }) 
                downVote.save();
            })
        }
    }
    return res.redirect("/");
}

exports.comments=(req,res,next)=>{
    const comment=req.body.comment;
    Article.findById(req.params.articleId)
    .then(article=>{
        if(res.locals.isAuthenticated){
            const comments=new Comment({
                owner:req.session.user,
                article:article,
                comment:comment
            })    
            comments.save();
            req.flash("message","Commented on the post !!")
            return res.redirect("/");
        }
        else{
            req.flash("message","Login Please !!")
            return res.redirect("/");
        }
    })
}