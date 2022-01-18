//set the port no
var PORT =process.env.PORT || 3000;
//get express
var express = require('express');
var app=express();

//set http server
var http=require('http').Server(app);

//use the folder as server
app.use(express.static(__dirname + '/public'));

http.listen(PORT,function()
{
	console.log('Server Started !!!');
});