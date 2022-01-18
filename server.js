//set the port no
var PORT =process.env.PORT || 3000;
//get express
var express = require('express');
var app=express();
//set http server
var http=require('http').Server(app);
//socket
var io=require('socket.io')(http);
var moment=require('moment');
//use the folder as server
app.use(express.static(__dirname + '/public'));

//on listen event
io.on('connection',function(socket)
{
	console.log('User connected via socket.io !!!!');

	//listen
	socket.on('message',function(message) {
		console.log('message received : ' + message.text);
		
		//send to everybody
		message.timestamp = moment().valueOf();
		io.emit('message',message);
		//send to everybody not to sender
		//socket.broadcast.emit('message',message);
	});

	//timestamp


	socket.emit('message',{
		text:'Welcome to the chat application!!',
		timestamp:moment().valueOf()
	});

});

http.listen(PORT,function()
{
	console.log('Server Started !!!');
});