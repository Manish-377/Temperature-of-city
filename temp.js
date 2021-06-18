const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
 

    res.sendFile(__dirname+"/temp.html");
 });

app.post("/",function(req,res){
   

    var query=req.body.cityName;
    var appid="7825f98439a646cd64aee44babd9380b";
    const unit="Metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+ "&units="+unit;
 
    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){

    const weatherData=JSON.parse(data);
   	const temp=weatherData.main.temp;
   	const weatherDescription=weatherData.weather[0].description;
   	const icon=weatherData.weather[0].icon;
   	const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

   	res.write("<p>The weather in "+ query+" is "+weatherDescription+"</p>");
    res.write("<h1>Temperature in "+ query+" is "+temp+" degree celsius</h1>");
    res.write("<img src="+imageURL+"> ");
    res.send();
      });

});
});

app.listen(3000,function(){

	console.log("server is running in port 3000");
});