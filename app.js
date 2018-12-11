
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var campgrounds = [
    {name: "Salmon Creek", image:"https://www.photosforclass.com/download/flickr-8365349500"},
    {name: "Granite Hill", image:"https://www.photosforclass.com/download/pixabay-964647?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe033b5092cf31c22d2524518b7444795ea76e5d004b0144591f5c17da3efb2_960.jpg&user=HaloJim"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/ea37b70a2df7033ed1584d05fb1d4e97e07ee3d21cac104491f4c479a3e9b1bd_340.jpg"}
];

// listen
const port = 3000;
app.listen(port, () => {
    console.log("listen on port: 3000");
});

// set
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// home page
app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

// show new form page
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

// add new camp 
app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds");
});