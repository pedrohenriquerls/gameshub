Template.room.created = function(){
	var currentRoom = this.data
	Session.set("current_room", currentRoom._id)

	if(currentRoom.ownerId == Meteor.userId() || !currentRoom.ownerId)
		Session.set("view", "games_list")
	else{
		Session.set("view", "room_guest")
	}
}

Template.room.destroyed = function(){
	var currentRoom = this.data

	if(currentRoom.ownerId == Meteor.userId())
		Rooms.update(currentRoom._id, {$set: {closed: true}})
	else
		gameStream.removeListener(Session.get("current_room"))

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