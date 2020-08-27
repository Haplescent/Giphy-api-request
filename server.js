// Requiring necessary npm packages
require('dotenv').config()
var axios = require('axios');
// const { json } = require('express');
var express = require("express");
var PORT = process.env.PORT || 8080;
var path = require("path")
// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
// routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
  // Route for getting some data about our giphy to be used client side

app.get("/api/giphy", function (req, res) {
  console.log(req)
  var config = {
    method: 'get',
    url: `https://api.giphy.com/v1/gifs/search?api_key=${process.env.ApiKey}&q=${req.query.string}&limit=20`,
    headers: { }
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
  
});


app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });