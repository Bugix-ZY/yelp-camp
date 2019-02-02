
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var app = express();

// var campgrounds = [
//     {name: "Salmon Creek", image:"https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/zbs_04"},
//     {name: "Granite Hill", image:"https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_1164,c_limit/iStock-820873602.jpg"},
//     {name: "Mountain Goat's Rest", image:"https://www.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697"},
//     {name: "Salmon Creek", image:"http://ladybugforgirls.org/wp-content/uploads/2018/05/Camping.jpg"},
//     {name: "Granite Hill", image:"https://www.travelyosemite.com/media/610215/housekeeping-camp_camp-view_1000x667.jpg"},
//     {name: "Mountain Goat's Rest", image:"https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,fl_lossy/g5/g5-c-ibbb3hsa-farran-realty-partners/g5-cl-53gz7m3i3-talus-apartments-homes/uploads/istock_000018411822_large.jpg"},
//     {name: "Salmon Creek", image:"https://images.wilderness-safaris.com/uploads/medium/file/667/small_focal_1712-savuti-camp.jpg"},
//     {name: "Granite Hill", image:"https://mk0theadventuregfnyq.kinstacdn.com/wp-content/uploads/Tips-for-Hiking-and-Camping-in-the-Snow-3.jpg"},
//     {name: "Mountain Goat's Rest", image:"http://www.kauaicamperrental.com/img/tents/img3.jpg"}
// ];

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
// Schema SetUp
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var CampGround = mongoose.model("Campground", campgroundSchema);

// CampGround.create(
//     {
//         name: "CAMP 2",
//         image: "https://mk0theadventuregfnyq.kinstacdn.com/wp-content/uploads/Tips-for-Hiking-and-Camping-in-the-Snow-3.jpg"
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("campground is created:");
//             console.log(campground);
//         }
//     }
// )
// var camp1 = new CampGround ({
//     name: "Camp1",
//     image: "https://www.photosforclass.com/download/flickr-8365349500"
// })

// camp1.save(function(err, camp){
//     if (err) {
//         console.log("something went wrong")
//     }
// });

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
    // get all campgrouds from the database
    CampGround.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    })
});

// show new form page
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

// add new camp 
app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = new CampGround ({
        name: name,
        image: image
    })
    newCamp.save(function(err, camp){
        if (err) {
            console.log("something went wrong")
        } else {
            console.log("new campground is created.")
            console.log(camp)
        }
    });
    
    res.redirect("/campgrounds");
});