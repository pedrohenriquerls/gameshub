
Template.create_room.events({
	"keyup #password": function(e, tmpl){
		var $password = tmpl.$("#password")
		e.stopPropagation()

		var $icon = $password.parent().find(".icon")
		var value = $password.val()
		if(value === ""){
			$icon.removeClass("lock")
			$icon.addClass("unlock")
		}else{
			$icon.addClass("lock")
			$icon.removeClass("unlock")
		}
	},
	"click #create_btn": function(e, tmpl){
		var newRoom = {
			title: tmpl.$("#title").val(),
			password: tmpl.$("#password").val()
		}

		var newRoomId = Rooms.insert(newRoom)

		if(newRoomId){
			$('#create_room').modal('hide')
			Router.go("/room/"+newRoomId)
		}
	}
})