const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
    //res.send("Server is up and running");
})

app.post("/", (req,res)=>{
        
    const query = req.body.cityName;
    const appid = "6955092d771d76c1bdd6628b44bd811d";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;

    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<html>");
            res.write(`<img src="${imgurl}"/>`)
            res.write("<h1>The temprature in "+query+" is "+ temp + " degree.</h1>")
            res.write("<p>The weather condition is " +desc +".</p>");
            res.write("</html>");
            //console.log(data)
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})