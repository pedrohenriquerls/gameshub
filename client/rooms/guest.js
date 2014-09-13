Template.room_guest.created = function(){
	Template.room_guest.guestCTX = null
	gameStream.on(Session.get("current_room"), function(data) {
		if(Template.room_guest.guestCTX){
			var image = new Image();
			image.src = data.img
			image.onload = function() {
			  Template.room_guest.guestCTX.drawImage(image, 0, 0);
			};
		}else{
			var guestCanvas = document.createElement("canvas")
		  Template.room_guest.guestCTX = guestCanvas.getContext("2d");
			guestCanvas.width=256
			guestCanvas.height=224

			var renderFilter = require("render")			
			renderFilter.init(false, guestCanvas, "guestDisplay")
			renderFilter.animate()
		}
	});
}