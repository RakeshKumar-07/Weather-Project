const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){
    const cityName = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=YOUR_API_IDe&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            //we can have multiple write request but only one send request
            // res.write("Hello\n");
            res.write("<h1>The Temperature in "+cityName+" is "+temp+" degree celcius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running...");
})
