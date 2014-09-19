Meteor.publish('rooms', function(){
	return Rooms.find({}, {
			img: 1,
			playingNow: 1,
			title: 1,
			private: 1
		});
});

Meteor.publish('games', function(){
  return Games.find();
});

Meteor.publish('game', function(gameId){
  return Games.find({_id: gameId}, {sourcePath: 1});
});

Meteor.publish('room', function(roomId){
	return Rooms.find({_id: roomId})
});

Meteor.publish('roomUsers', function(roomId){
	return  Meteor.users.find({currentRoom: roomId})
})

Meteor.publish('usersOnlineWithoutRoom', function(){
	return  Meteor.users.find({"status.online": true}, { "currentRoom" : { "$exists" : false } } )
})
