Template.games_list.helpers({
	games: function(){
		return Games.find({})//ownerId: Meteor.user()._id})
	}
})

Template.games_list.events({
	"click .play_game": function(e, tmpl){
		e.stopPropagation()

		var currentRoom = Rooms.findOne({_id: Session.get("current_room")})

		if(currentRoom.ownerId == Meteor.userId()){
			var $game = $(e.currentTarget)
			var gameInstance = Games.findOne({_id: $game.data("id")})

			Session.set("view", gameInstance.platform)
			Session.set("game_path", gameInstance.path)

			currentRoom.playingNow = gameInstance.name
			currentRoom.img = gameInstance.img

			Rooms.update(currentRoom._id, currentRoom)
		}
	}
})