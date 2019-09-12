var express = require("express");
var router  = express.Router();
var Movie = require("../models/movie");
var middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
       if(err){
           console.log(err);
       } else {
          res.render("movies/index",{movies:allMovies});
       }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to movies array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newMovie = {name: name, image: image, description: desc, author:author};
    // Create a new movie and save to DB
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to movies page
            console.log(newlyCreated);
            res.redirect("/movies");
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("movies/new"); 
});

// SHOW
router.get("/:id", function(req, res){
    //find the movie with provided ID
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            console.log(foundMovie)
            //render show template with that movie
            res.render("movies/show", {movie: foundMovie});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkMovieOwnership, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        res.render("movies/edit", {movie: foundMovie});
    });
});

// UPDATE
router.put("/:id",middleware.checkMovieOwnership, function(req, res){
    // find and update the correct movie
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
       if(err){
           res.redirect("/movies");
       } else {
           //redirect somewhere(show page)
           res.redirect("/movies/" + req.params.id);
       }
    });
});

// DESTROY
router.delete("/:id",middleware.checkMovieOwnership, function(req, res){
   Movie.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/movies");
      } else {
          res.redirect("/movies");
      }
   });
});

module.exports = router;