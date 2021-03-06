var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

// SHOW REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + user.username);
            res.redirect("/movies");
        });
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
});
// handle login logic
router.post("/login", passport.authenticate("local",
                                        {successRedirect: "/movies",
                                        failureRedirect: "/login"}),
                                        function(req, res) {
                                            
                                        });

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out!");
    res.redirect("/movies");
});

module.exports = router;