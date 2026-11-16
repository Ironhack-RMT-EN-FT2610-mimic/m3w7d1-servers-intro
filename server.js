process.loadEnvFile()

const express = require("express");
const morgan = require('morgan')
const allBooks = require("./data/books.json");
const app = express();

const port = process.env.PORT || 5005;

function myMiddleware(req, res, next) {
  console.log("running this middleware");

  req.newValue = "bob"

  next(); // now move into the corresponding route

  // why do we use middlewares?
  // rejecting requests based on location, auth status, payments
  // record some data for analysis
  // for privacy, we can pass info to the request when needed
}

// app.use(myMiddleware);

app.use( morgan("dev") )
app.use( express.static("public") ) // let's express knows that all static files are in the public folder

app.get("/", (req, res) => {
  res.send("Hello World from the main path!");
});

app.get("/potato", (req, res) => {
  res.send("Here is a potato!");
});

app.get("/friends/all/pete", (req, res) => {
  res.send("Here is info about your friend Pete");
});

app.get("/books", myMiddleware, (req, res) => {
  console.log(req.newValue)
  res.json(allBooks);
});

app.get("/books/random", (req, res) => {
  const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
  res.json(randomBook);
});

app.get("/home", (req, res) => {
  console.log(__dirname) // the absolute path of the server.js
  res.sendFile(__dirname + "/views/index.html")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
