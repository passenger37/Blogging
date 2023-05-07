const bcrypt=require("bcryptjs");

const User=require("../models/user");

exports.createUser=(req,res,next)=>{
    console.log(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;

    User.findOne({email:email})
        .then(user=>{
            if(user){
                req.session.user = user;
                req.session.isAuthenticated=true;
                return res.redirect("/");
            }
            bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                  name:name,
                  email: email,
                  password: hashedPassword,
                })
                user.save();
            })
            req.flash("message",`User ${name} is created Successfully !!`)
            return res.redirect("/");
        })
        .catch(err=>{
            res.redirect("/");
            req.flash("message",`User ${name} is already have !!`)
            console.log(err);
        })

}

exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt
            .compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                  req.session.isAuthenticated = true;
                  req.session.user = user;
                return req.session.save(err => {
                  console.log(err);
                  req.flash("message",`User ${user} is Login Successfully !!`)
                  res.redirect('/');
                });}
            })
        }
})}

exports.loginPage=(req,res,next)=>{
    res.render("user/loginPage",{isAuthenticated:req.session.isAuthenticated});
}

exports.signupPage=(req,res,next)=>{
    res.render("user/signupPage",{isAuthenticated:req.session.isAuthenticated});
}

exports.profile=(req,res,next)=>{
    res.render("user/profile",{isAuthenticated:req.session.isAuthenticated});
}

exports.logout=(req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect("/");
    })
}