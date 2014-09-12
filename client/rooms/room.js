Template.room.created = function(){
	var currentRoom = this.data
	Session.set("current_room", currentRoom._id)
	Session.set("view", "games_list")
}

Template.room.helpers({
	view: function(){
		return Session.get("view")
	},
	isOwner: function(){
		return (this.ownerId == Meteor.userId())
	}
})