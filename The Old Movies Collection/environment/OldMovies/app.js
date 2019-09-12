var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    // Movie           = require("./models/movie"),
    // Comment         = require("./models/comment"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");

// REQUIRING ROUTES
var commentRoutes    = require("./routes/comments"),
    movieRoutes      = require("./routes/movies"),
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/old_movies", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "asdfasdf",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});

// Movie.create({
//     name: "Persona",
//     image: "https://s3.amazonaws.com/criterion-production/films/d5c135c95f58e74e2ee28cb92659bafd/DoD5SlisIFjKyi0zucupnwj2B3ADGy_large.jpg"
// });
