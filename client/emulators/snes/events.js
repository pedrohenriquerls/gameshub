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
	frameskip_adjust = function(n){
		frameskip+=n
		if(frameskip<0) frameskip=0
			frameskip_text.value=frameskip	      
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
	snes_test = function(render){
		snes_init()              
		start_time=new Date().getTime()
		for(var i=0;i<5000;i++){
			mainloop(palf ? 312 : 262)
			if(render)
				renderscreen()	
		}
		end_time=new Date().getTime()
		fps_text.value=((end_time-start_time)/1000).toFixed(3)
	}

	var container;

      var camera, scene, renderer, composer;

      var has_gl = false;

      var ratio = window.devicePixelRatio || 1;
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      var activeWidth = Math.round(winHeight * (4 / 3));

      var delta;
      var time;
      var oldTime;

      //var texa = THREE.ImageUtils.loadTexture( "overlay3.png" );
      //var texb = THREE.ImageUtils.loadTexture( "sun-flare3.jpg" );
      
      var overlay, overlay2;
      var snesLayer, snesTexture;
      var effectCrt;
      var fxaa;

      var snesLoaded = false;

      init = function() {

        container = document.getElementById( 'snes' );
        //document.body.appendChild( container );

        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera( 50, activeWidth / winHeight, 0, 0 );
        scene.add( camera );

          /*var overlayMaterial = new THREE.SpriteMaterial( { map: texa, useScreenCoordinates: true, blending: THREE.NormalBlending } );
          overlay = new THREE.Sprite( overlayMaterial );
          overlay.scale.set( (winWidth*1.09)/ratio, (winHeight*1.06)/ratio , 1 );
          overlay.position.set((winWidth/ratio)/2, (winHeight/ratio)/2 , 0);
          camera.add(overlay);

          var overlayMaterial2 = new THREE.SpriteMaterial( { map: texb, useScreenCoordinates: true, blending: THREE.AdditiveBlending } );
          overlay2 = new THREE.Sprite( overlayMaterial2 );
          overlay2.scale.set( winWidth/ratio, winHeight/ratio , 1 );
          overlay2.position.set((winWidth/ratio)/2, (winHeight/ratio)/2 , 0);
          camera.add(overlay2);*/


        snesTexture = new THREE.Texture( getTexture() );
        //snesTexture.minFilter = THREE.NearestFilter;
        //snesTexture.magFilter = THREE.NearestFilter;
        snesTexture.needsUpdate = false;

          var snesMaterial = new THREE.SpriteMaterial( { map: snesTexture, useScreenCoordinates: true, fog: false } );
          snesLayer = new THREE.Sprite( snesMaterial );
          snesLayer.scale.set( winWidth/ratio, winHeight/ratio, 1 );
          snesLayer.position.set((winWidth/ratio)/2, (winHeight/ratio)/2 , 0);
          camera.add(snesLayer);


        try {
          // renderer
          renderer = new THREE.WebGLRenderer({antialias: false});
          renderer.setSize( activeWidth, winHeight );
          renderer.setClearColor( 0x222222 );

          // postprocessing
          renderer.autoClear = false;

          var renderModel = new THREE.RenderPass( scene, camera );
          effectCrt = new THREE.ShaderPass( THREE.CrtShader );
          effectCrt.uniforms[ 'size' ].value.x = winWidth;
          effectCrt.uniforms[ 'size' ].value.y = winHeight;
          var effectBloom = new THREE.BloomPass( 0.2 );

          fxaa = new THREE.ShaderPass( THREE.FXAAShader );
          fxaa.uniforms[ 'resolution' ].value = new THREE.Vector2( 1/winWidth, 1/winHeight );

          var effectVignette = new THREE.ShaderPass( THREE.VignetteShader );
          effectVignette.uniforms[ "offset" ].value = 0.5;
          effectVignette.uniforms[ "darkness" ].value = 2.0;

          var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
          effectCopy.renderToScreen = true;

          composer = new THREE.EffectComposer( renderer );

          composer.addPass( renderModel );
          composer.addPass( effectCrt );
          //composer.addPass( effectBloom );
          //composer.addPass( effectVignette );
          //composer.addPass( fxaa );
          composer.addPass( effectCopy );

          container.appendChild( renderer.domElement );
          has_gl = true;

          window.addEventListener( 'resize', onWindowResize, false );
        }
        catch (e) {
          // need webgl
          document.getElementById('info').innerHTML = "<P><BR><B>Note.</B> You need a modern browser that supports WebGL for this to run the way it is intended.<BR>For example. <a href='http://www.google.com/landing/chrome/beta/' target='_blank'>Google Chrome 9+</a> or <a href='http://www.mozilla.com/firefox/beta/' target='_blank'>Firefox 4+</a>.<BR><BR>If you are already using one of those browsers and still see this message, it's possible that you<BR>have old blacklisted GPU drivers. Try updating the drivers for your graphic card.<BR>Or try to set a '--ignore-gpu-blacklist' switch for the browser.</P><CENTER><BR><img src='../general/WebGL_logo.png' border='0'></CENTER>";
          document.getElementById('info').style.display = "block";
          return;
        }

      }

      onWindowResize = function( event ) {
    
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
        activeWidth = Math.round(winHeight * (4 / 3));

        renderer.setSize( activeWidth, winHeight );

        //camera.aspect = activeWidth / winHeight;
        //camera.updateProjectionMatrix();

        composer.setSize( activeWidth, winHeight );

        effectCrt.uniforms[ 'size' ].value.x = activeWidth;
        effectCrt.uniforms[ 'size' ].value.y = winHeight;

        //fxaa.uniforms[ 'resolution' ].value = new THREE.Vector2( 1/activeWidth, 1/winHeight );

          //overlay.scale.set( (activeWidth*1.09)/ratio, (winHeight*1.06)/ratio , 1 );
          //overlay.position.set((activeWidth/ratio)/2, (winHeight/ratio)/2 , 0);

          //overlay2.scale.set( activeWidth/ratio, winHeight/ratio , 1 );
          //overlay2.position.set((activeWidth/ratio)/2, (winHeight/ratio)/2 , 0);

          snesLayer.scale.set( activeWidth/ratio, winHeight/ratio, 1 );
          snesLayer.position.set((activeWidth/ratio)/2, (winHeight/ratio)/2 , 0);
      }

      getTexture = function() {

        return maincanvas;

      }

      animate = function() {

        requestAnimationFrame( animate );

        render();

      }

      render = function() {

        time = Date.now();
        delta = time - oldTime;
        oldTime = time;

        if (isNaN(delta) || delta > 1000 || delta == 0 ) {
          delta = 1000/60;
        }

        effectCrt.uniforms[ 'globalTime' ].value += delta*(Math.random()*0.005);
        
        //overlay2.material.opacity = 0.58 + Math.random()*0.12;

        //snesTexture.image = getTexture();
        snesTexture.needsUpdate = true;

        if (snesLoaded) {
          snes_mainloop();
        }

        if (has_gl) {
          renderer.clear();
          composer.render( 0.01 );
        }

      }

      getQueryString = function() {
          var data = [];
          var param;
          for(x = 0; x < arguments.length; ++x) {
              param = location.href.match(new RegExp("/\?".concat(arguments[x],"=","([^\n&]*)")));
              if (param == null) {
                  data = undefined;
              } else {
                  data.push(param[1]);
              }
          }
          return data;
      }  

	loadRom = function( url ) {
				var request = new XMLHttpRequest();
				request.onload = function(){
					Module.FS_createDataFile("/", "_.smc", new Uint8Array(request.response) , true, true);
					snesLoaded = true;
					snes_main();
					init();
					animate();
				};
				request.open('GET', "/snes/mario.smc", true);
				request.responseType = "arraybuffer";
				request.send();
			}
}