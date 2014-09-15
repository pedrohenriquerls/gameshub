Meteor.publish('rooms', function(){
	return Rooms.find({closed: false}, {
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
  Meteor.publishWithRelations({
    handle: this,
    collection: Rooms,
    filter: roomId,
    mappings: [{
      key: 'users',
      collection: Meteor.users,
      filter: {"status.online": true}
    }]
  });
});
