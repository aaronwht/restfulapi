const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	const person = {
		firstName: "Bill",
		lastName: "Smith",
	};

	return res.send(JSON.stringify(person));
});

app.post("/", (req, res) => {
	return res.send(
		JSON.stringify({ firstName: req.body.firstName, id: Math.random() })
	);
});

app.get("/people", (req, res) => {
	const persons = [
		{
			id: Math.random(),
			firstName: "Bill",
			lastName: "Smith",
		},

		{
			id: Math.random(),
			firstName: "Bob",
			lastName: "Smith",
		},
	];
	return res.send(JSON.stringify(persons));
});

http.createServer(app).listen(process.env.PORT || 8080);
