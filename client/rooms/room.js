Template.room_item.helpers({
	playingNow: function(){
		return this.playingNow ? this.playingNow : "Selecting game..."
	}
})

Template.room.created = function(){
	var currentRoom = this.data

	if(currentRoom){
		if(currentRoom.ownerId == Meteor.userId() || !currentRoom.ownerId){
			Session.set("view", "games_list")
			peerJSInstance.on("connection", function(conn){
		    roomConnection = conn

				conn.on("close", function(){

				})
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

	window.keyup   = undefined
	window.keydown = undefined

	window.resquestAnimationFrame = undefined
}

Template.room.helpers({
	view: function(){
		return Session.get("view")
	},
	isOwner: function(){
		return (this.ownerId == Meteor.userId())
	}
})
