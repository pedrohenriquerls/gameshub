Template.room.created = function(){
	var currentRoom = this.data
	Session.set("current_room", currentRoom._id)

	if(currentRoom.ownerId == Meteor.userId() || !currentRoom.ownerId)
		Session.set("view", "games_list")
	else{
		Session.set("view", "room_guest")

		gameStream.on(currentRoom._id, function(data) {
			console.log(data)
			var image = new Image();
			image.src = data.img
			image.onload = function() {
			  //mainctx.drawImage(image, 0, 0);
			};
		});
	}
		
}

Template.room.destroyed = function(){
	var currentRoom = this.data

	if(currentRoom.ownerId == Meteor.userId())
		Rooms.update(currentRoom._id, {$set: {closed: true}})

	Session.set("current_room", null)
}

Template.room.helpers({
	view: function(){
		return Session.get("view")
	},
	isOwner: function(){
		return (this.ownerId == Meteor.userId())
	}
})