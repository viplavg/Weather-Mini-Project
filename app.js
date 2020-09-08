
const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){



  res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res){

  const apiKey = "e92871e8422e879ef30f53e34e2e79d8";
  const unit = "metric";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey +"&units="+ unit +"&q="+ query +"";
  https.get(url, function(response){
    console.log(response.statusCode);


    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degress celsius.</h1>");
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + imageURl + ">");
      res.send();
    });
  });


})






app.listen(3000, function(){
  console.log("Server is running at port 3000.");
});
