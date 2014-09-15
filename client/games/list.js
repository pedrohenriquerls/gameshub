Template.games_list.helpers({
	hasGames: function(){
		return (Games.find({}).count() > 0)
	},
	games: function(){
		return Games.find({})//ownerId: Meteor.user()._id})
	}
})

Template.games_list.events({
	"click .play_game": function(e, tmpl){
		e.stopPropagation()

		var currentRoom = tmpl.data

		if(currentRoom.ownerId == Meteor.userId()){
			var $game = $(e.currentTarget)
			var gameInstance = Games.findOne({_id: $game.data("id")})

			Session.set("view", gameInstance.platform)
			Session.set("game_path", gameInstance.romPath)

			var doc = {
				playingNow: gameInstance.name,
				img: gameInstance.img
			}

			Rooms.update(currentRoom._id, {$set: doc})
		}
	}
})
