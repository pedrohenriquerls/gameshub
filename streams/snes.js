snesStream = new Meteor.Stream('snes');

if(Meteor.isClient){
	var roomId = Session.get("current_room")
	snesStream.on(roomId, function(data) {
		var image = new Image();
		image.src = data.img
		image.onload = function() {
		  mainctx.drawImage(image, 0, 0);
		};
	});
}

if(Meteor.isServer) {
	snesStream.permissions.write(function(evt, args) {
	  return args.ownerId == this.userId
	});

	snesStream.permissions.read(function(eventName) {
	  return true//this.userId == eventName;
	});
}