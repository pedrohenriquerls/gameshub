Template.room_item.helpers({
	playingNow: function(){
		return this.playingNow ? this.playingNow : "Selecting game..."
	}
})

Template.room.created = function(){
	var currentRoom = this.data
	if(currentRoom){
		Meteor.call('setCurrentRoom', Meteor.userId(), currentRoom._id);

		if(currentRoom.ownerId == Meteor.userId()){
			Meteor.subscribe('secondPlayerAvatar', currentRoom._id)
			Session.set("view", "games_list")

			peerJSInstance.on("connection", function(conn){
				roomConnection = conn

				var guestControl = null
				require('guest_controller', function (guestController) {
					guestControl = guestController
				});
				roomConnection.on('data', function(keyPressed){
					var commandFired =  guestControl.translateKeyPress(keyPressed)
					console.log(commandFired)
					guestControl.fire("keydown", commandFired)
					guestControl.fire("keyup", commandFired)
				})

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
		Rooms.remove(currentRoom._id)
	}

	if(roomConnection)
		roomConnection.close()

	Meteor.call('unsetCurrentRoom', Meteor.userId(), currentRoom._id);

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
	},
	haveASecondPlayer: function(){
		return (this.secondPlayerId)
	},
	ownerAvatar: function(){
		var owner = Meteor.users.findOne(this.ownerId)
		if(owner)
			return owner.avatar
	},
	guestAvatar: function(){
		return Meteor.users.findOne(this.secondPlayerId).avatar
	}
})
