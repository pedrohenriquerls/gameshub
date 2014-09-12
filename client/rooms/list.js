Template.rooms_list.helpers({
	rooms: function(){
		var rooms = Rooms.find({closed: false})
		return rooms
	}
})