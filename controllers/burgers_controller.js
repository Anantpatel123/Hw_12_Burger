var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get('/', function(req, res) {
	res.redirect('/index');
});

router.get('/index', function(req, res) {
	burger.all(function(data) {
		var hbsObject = {burger: data};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/api/burgers', function(req, res) {
	burger.create(["burger_name", "devoured"], [req.body.name, false], function(result) {
		
		// res.json({ id: result.insertId });
		res.redirect('/index');
	});	
});

router.put('/api/update/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);

	burger.update({devoured: req.body.devoured}, condition, function() {
		// if (result.changedRows == 0) {
		// 	// If no rows were changed, then the ID must not exist, so 404
		// 	return res.status(404).end();
		//   } else {
		// 	res.status(200).end();
		//   }
		res.redirect('/index');
	});
});



// router.get("/index", function(req, res) {
//   burger.all(function(data) {
//     var hbsObject = {
//       burger: data
//     };
//     // console.log("this is hbsobject ", hbsObject);
//     res.render("index", hbsObject);
//   });    
// });
// router.post("/api/burgers", function(req, res) {
//   // console.log(req.body);
//   burger.create(["burger_name", "devoured"], [req.body.burger_name, false], function(result) {
//     // Send back the ID of the new quote
//     console.log("added burger: ", result)
//     res.json({ id: result.insertId });
    
//     });
// });

// router.put("/api/update/:id", function(req, res) {
//   var condition = "id = " + req.params.id;  
//   console.log("condition", condition);  
//   burger.update({
//     devoured: req.body.devoured
//   }, condition, function() {
//     res.redirect("/index")
//     if (result.changedRows == 0) {
//         return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

module.exports = router;