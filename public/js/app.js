//initialize
var socket=io();

var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('rname');

console.log(name + ' wants to join ' + room);

jQuery('.roomName').text('Welcome to room '+room);

socket.on('connect',function()
{
	console.log('connected to socket.io server !!');
	socket.emit('joinRoom',{
		name:name,
		room:room
	});
});

socket.on('message',function(message)
{
	var momentTimestamp=moment.utc(message.timestamp);
	console.log("New message :");
	console.log(message.text);
	var $messages=jQuery('.messages');
	var $message=jQuery('<li class="list-group-item"> </li>');
	$message.append('<p> <strong> '+ message.name +' '+ momentTimestamp.local().format('h:mm a') +' </strong></p>');
	$message.append('<p>'+ message.text +'</p>');
	$messages.append($message);
});

//sending the message data from the form
var $form = jQuery('#message-form');

$form.on('submit',function(event)
{
	event.preventDefault();

	var $message = $form.find('input[name=message]'); 
	socket.emit('message',{
		name:name,
		text: $message.val()
	});

	$message.val('');
	
});