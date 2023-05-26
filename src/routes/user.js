const express=require("express");

const router=express.Router();

const userController=require("../controllers/user");

router.post("/createuser",userController.createUser);

router.get("/logout",userController.logout);

router.post("/login",userController.login);

router.get("/loginPage",userController.loginPage);

router.get("/signupPage",userController.signupPage);

router.get("/profilepage/:id",userController.profile);

module.exports =router;