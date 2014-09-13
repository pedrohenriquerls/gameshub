Template.snes.created = function(){
	cout_print= function(txt){
		cout.value+=txt+"\n"
		cout.scrollTop = 999999
	}
	ToggleQuality = function(){	  	      
		if(maincanvas.style.imageRendering.toLowerCase()=="optimizespeed")
			maincanvas.style.imageRendering="optimizeQuality"
		else
			maincanvas.style.imageRendering="optimizeSpeed"

		cout_print(maincanvas.style.imageRendering)
	}
	     
	snes_onkeyevent = function(e){
		var joy1=0
		globale=e
		var key=e.key || e.keyCode	      	 	      
		switch(key){
			case 87:  joy1=0x0010;break;
			case 81:  joy1=0x0020;break;
			case 65:  joy1=0x0040;break;
			case 83:  joy1=0x0080;break;
			case 39: 	joy1=0x0100;break;
			case 37:  joy1=0x0200;break;
			case 40:  joy1=0x0400;break;
			case 38:  joy1=0x0800;break;
			case 67:  joy1=0x1000;break;
			case 68:  joy1=0x2000;break;
			case 90:  joy1=0x4000;break;
			case 89:  joy1=0x4000;break;
			case 88:  joy1=0x8000;break;
		}
		if(e.type=="keyup"){
			joy1state&=~joy1;
			native_set_joypad_state(joy1state);
		}
		else if (e.type=="keydown"){
			joy1state|=joy1;
			native_set_joypad_state(joy1state);
		}
		if(joy1) e.preventDefault()
	}
	snes_init = function(){
		reboot_emulator=Module.cwrap('reboot_emulator', 'number', ['string'])
		native_set_joypad_state=Module._native_set_joypad_state
		native_bitmap_pointer=Module._native_bitmap_pointer
		mainloop=Module._mainloop
		renderscreen=Module._renderscreen
		fps_text=document.getElementById("fps")
		palf=reboot_emulator("/_.smc")
		window.onkeydown = snes_onkeyevent
		window.onkeyup = snes_onkeyevent
		joy1state=0x80000000
		native_set_joypad_state(joy1state)

		frameskipped=0
		for(var i=0;i<288*224*4;i+=4){		 
			imgData.data[i+3]=0xff
		}

	}

	snes_readfile = function(controller){	      
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
		var f=controller.files[0]
		cout_print(f.name)
		var reader= new FileReader()
		reader.onprogress = function(e){
			if (e.lengthComputable){
				cout_print(Math.round((e.loaded / e.total) * 100)+"%")
			}
			else{
				count_print(e.loaded+"bytes")
			}
		}
		reader.onload = function(e) {		 
			cout_print("_.smc loaded")		  
			Module.FS_createDataFile("/", "_.smc", new Uint8Array(this.result) , true, true)		  
		}	      
		reader.readAsArrayBuffer(f)
	}           
	snes_main = function(){
		document.getElementById("start").disabled=true
		snes_init()	            
		reboot_romnum=-1	  	   
		frames=0	   
		last_time=new Date().getTime()
		snes_mainloop();
	}

  var renderFilter = require("render")
	loadRom = function( url ) {
		var request = new XMLHttpRequest();
		request.onload = function(){
			Module.FS_createDataFile("/", "_.smc", new Uint8Array(request.response) , true, true);
			snes_main();

			renderFilter.init(true);
			renderFilter.animate();
		};
		request.open('GET', url, true);
		request.responseType = "arraybuffer";
		request.send();
	}
}