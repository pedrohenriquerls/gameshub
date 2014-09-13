
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
		var $title = tmpl.$("#title")
		var newRoom = {
			title: $title.val(),
			password: tmpl.$("#password").val()
		}

		if(newRoom.title.replace(/\s/g, '') != ""){
			$title.parent().removeClass("error")
			var newRoomId = Rooms.insert(newRoom)

			if(newRoomId){
				$('#create_room').modal('hide')
				Router.go("/room/"+newRoomId)
			}	
		}else{
			$title.parent().addClass("error")
		}
	}
})