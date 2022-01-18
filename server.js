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

var clientInfo={};

//sends current users to provided socket
function sendCurrentUsers(socket)
{
	var info = clientInfo[socket.id];
	var users=[];

	if(typeof info === 'undefined')
	{
		return;
	}

	Object.keys(clientInfo).forEach(function(socketId)
	{
		var userInfo= clientInfo[socketId];
		if(info.room === userInfo.room)
		{
			users.push(userInfo.name);
		}
	});

	socket.emit('message',{
		name:'System',
		text:'Active users :'+users.join(', '),
		timestamp:moment.valueOf()
	});
}
//on listen event
io.on('connection',function(socket)
{
	console.log('User connected via socket.io !!!!');

	socket.on('disconnect',function()
	{
		if(typeof clientInfo[socket.id] !== 'undefined')
		{
			var userData=clientInfo[socket.id];
			socket.leave(userData.room);
			socket.broadcast.to(userData.room).emit('message',
			{
				name:'System',
				text:userData.name+' has leave room '+ userData.room+'!!',
				timestamp:moment().valueOf()
			});

			delete clientInfo[socket.id];

		}

	});

	socket.on('joinRoom',function(req,res)
	{
		clientInfo[socket.id]=req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',
			{
				name:'System',
				text:req.name+' has joined room!!',
				timestamp:moment().valueOf()
			});
	});
	//listen
	socket.on('message',function(message) {
		console.log('message received : ' + message.text);
		
		if(message.text === '@currentUsers')
		{
			sendCurrentUsers(socket);
		}
		else
		{
			//send to everybody
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message',message);
		}
		//send to everybody not to sender
		//socket.broadcast.emit('message',message);
	});

	//timestamp


	socket.emit('message',{
		name:'System',
		text:'Welcome to the chat application!!',
		timestamp:moment().valueOf()
	});

});

http.listen(PORT,function()
{
	console.log('Server Started !!!');
});