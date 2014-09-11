snesStream = new Meteor.Stream('snes');

if(Meteor.isClient){
	snesStream.on('img_data', function(img) {
		console.log(img)
		var image = new Image();
		image.src = img
		image.onload = function() {
		  mainctx.drawImage(image, 0, 0);
		};
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