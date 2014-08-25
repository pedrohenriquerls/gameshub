snesStream = new Meteor.Stream('snes');

if(Meteor.isClient){
	snesStream.on('img_data', function(jsonImg) {
		//var img = JSON.parse( jsonImg )
	  console.log(jsonImg)
	});
}

if(Meteor.isServer) {
	snesStream.permissions.write(function(eventName) {
	  return true//eventName == 'private-page' && this.userId;
	});

	snesStream.permissions.read(function(eventName) {
	  return true//this.userId == eventName;
	});
}