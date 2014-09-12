gameStream = new Meteor.Stream('game');

if(Meteor.isServer) {
	gameStream.permissions.write(function(evt, args) {
	  return args.ownerId == this.userId
	});

	gameStream.permissions.read(function(eventName) {
	  return true//this.userId == eventName;
	});
}