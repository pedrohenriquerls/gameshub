Template.rooms_list.helpers({
	rooms: function(){
		var rooms = Rooms.find({closed: false})
		return rooms
	}
})

Template.rooms_list.events({
	"click .item": function(e, tmpl){
		e.stopPropagation()

		var $room = $(e.currentTarget)
		var roomId = $room.data("id")

		Router.go("/room/"+roomId)
	}
})