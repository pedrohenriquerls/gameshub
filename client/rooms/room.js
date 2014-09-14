Template.room.created = function(){
	var currentRoom = this.data

	if(currentRoom){
		if(currentRoom.ownerId == Meteor.userId() || !currentRoom.ownerId){
			Session.set("view", "games_list")	
			peerJSInstance.on("connection", function(conn){
		    roomConnection = conn
		  })
		}else{
			roomConnection = peerJSInstance.connect(currentRoom.ownerId)
			Session.set("view", "room_guest")
		}
	}
}

Template.room.destroyed = function(){
	var currentRoom = this.data

	if(currentRoom.ownerId == Meteor.userId()){
		Rooms.update(currentRoom._id, {$set: {closed: true}})
	}
		
	if(roomConnection)
		roomConnection.close()
}

Template.room.helpers({
	view: function(){
		return Session.get("view")
	},
	isOwner: function(){
		return (this.ownerId == Meteor.userId())
	}
})