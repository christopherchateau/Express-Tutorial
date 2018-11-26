const express = require("express");
const app = express();
const responseData = require('./data.json');


const urlLogger = (request, response, next) => {
  console.log("Request URL:", request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log("Datetime:", new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);

app.use(express.static("public"));

app.get("/json", (request, response) => {
  response.status(200).json(responseData);
});

app.listen(3000, () => {
  console.log("Express Intro running on localhost:3000");
});

app.get("/sunsets", (request, response) => {
  response.sendFile("/public/sunsets.html", { root: __dirname });
});

app.use( (request, response, next) => {
  response.status(404).send("404 error - get off my lawn!!!");
});
