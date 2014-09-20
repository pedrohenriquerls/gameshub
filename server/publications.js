Meteor.publish('rooms', function(){
	return Rooms.find({}, {
		img: 1,
		playingNow: 1,
		title: 1,
		private: 1
	});
});

Meteor.publish('games', function(){
  return Games.find({});
});

Meteor.publish('game', function(gameId){
  return Games.find({_id: gameId}, {sourcePath: 1});
});

Meteor.publish('users', function(){
	return Meteor.users.find({"status.online": true})
})

Meteor.publish('roomSecondPlayer', function(roomId){
	Rooms.findOne({_id: roomId}, {secondPlayerAvatar: 1, secondPlayerId: 1})
})
