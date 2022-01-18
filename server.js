//set the port no
var PORT =process.env.PORT || 3000;
//get express
var express = require('express');
var app=express();
//set http server
var http=require('http').Server(app);
//socket
var io=require('socket.io')(http);

//use the folder as server
app.use(express.static(__dirname + '/public'));

//on listen event
io.on('connection',function()
{
	console.log('User connection established via socket.io !!!!');
});

http.listen(PORT,function()
{
	console.log('Server Started !!!');
});