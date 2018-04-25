
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8000;
var app = express();

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/",routes);


// working. Showing all of burgers from the database.
// app.get("/", function(req, res) {
//     connection.query("SELECT * FROM menu;", function(err, data) {
//       if (err) throw err;
//       res.render("index", {burgers: data});
//     });
// });

// working. Updating burger to the database.
// app.post("/", function(req, res) {
//     connection.query("INSERT INTO menu (burger_name) VALUES (?)", [req.body.burger_name], function(err, result) {
//       if (err) {
//         return res.status(500).end();
//       }
//       res.redirect("/");
//       console.log(result);
//     //   res.json({ id: result.insertId});      
//     });
//   });


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});