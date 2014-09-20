Template.room_guest.rendered = function(){
	Template.room_guest.guestCTX = null

	if(roomConnection){
		roomConnection.on('open', function() {
			roomConnection.on('data', function(imgData){
				if(Template.room_guest.guestCTX){
					var image = new Image();
					image.src = imgData
					image.onload = function() {
						Template.room_guest.guestCTX.drawImage(image, 0, 0);
					};
				}else{
					var guestCanvas = document.createElement("canvas")
					Template.room_guest.guestCTX = guestCanvas.getContext("2d");
					guestCanvas.width=256
					guestCanvas.height=224

					var display = require("display")
					display.init(false, guestCanvas, "guestDisplay")
					display.animate()
				}
			});
		});
	}
}
