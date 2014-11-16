Template.games_list.helpers({
	hasGames: function(){
		return (Games.find({}).count() > 0)
	},
	games: function(){
		return Games.find({})//ownerId: Meteor.user()._id})
	}
})

Template.games_list.events({
	"mouseenter .play_game": function(e, tmpl){
		var $game = $(e.currentTarget)
		$game.addClass("selected_game")

		$("#title").text($game.data("title"))
		$("#description").text($game.data("description"))
		$("#cover").attr("src", $game.data("cover"))
	},
	"mouseleave .play_game": function(e, tmpl){
		var $game = $(e.currentTarget)
		$game.removeClass("selected_game")
	},
	"click .play_game": function(e, tmpl){
		e.stopPropagation()

		var currentRoom = tmpl.data

		if(currentRoom.ownerId == Meteor.userId()){
			var $game = $(e.currentTarget)
			var gameInstance = Games.findOne({_id: $game.data("id")})

			if(_.isEmpty(gameInstance.sourcePath)){
				console.log("show error message...")
			}else{
				Session.set("view", gameInstance.platform)
				Session.set("game_path", gameInstance.sourcePath)

				var doc = {
					playingNow: gameInstance.name,
					img: gameInstance.img
				}

				Rooms.update(currentRoom._id, {$set: doc})
			}
		}
	}
})
