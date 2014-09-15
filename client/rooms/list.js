Template.rooms_list.helpers({
})

Template.rooms_list.events({
	"click .item": function(e, tmpl){
		e.stopPropagation()

		var $room = $(e.currentTarget)
		var roomId = $room.data("id")

		Router.go(Router.routes['room'].url({_id: roomId}))
	}
})
