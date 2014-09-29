define("display", [], function(){
	var container;

  var camera, scene, renderer, composer;

  var has_gl = false;

  var ratio = window.devicePixelRatio || 1;
  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight - 100;
  var activeWidth = Math.round(winHeight * (4/3));

  var delta;
  var time;
  var oldTime;

  var overlay, overlay2;
  var snesLayer, snesTexture;
  var effectCrt;
  var fxaa;

  var snesLoaded = false;
  var retroArchModule = null

  var maincanvas = null
  var me = {
	  init: function(loaded, canvas, divId, Module) {
	  	retroArchModule = Module
	  	snesLoaded = loaded
	  	maincanvas = canvas

	  	maincanvas.width=256
			maincanvas.height=224
			maincanvas.id = "canvas"

	    container = document.createElement( 'div' );
	    var parent = document.getElementById(divId)
	    parent.appendChild( container );

			/*var $parent = $(parent)
			var winWidth = $parent.width();
			var winHeight = $parent.height();
			var activeWidth = Math.round(winHeight * (4 / 3));*/

	    scene = new THREE.Scene();

	    camera = new THREE.PerspectiveCamera( 50, activeWidth / winHeight, 0, 0 );
	    scene.add( camera )


	    snesTexture = new THREE.Texture( this.getTexture() );
	    snesTexture.needsUpdate = false;

	    var snesMaterial = new THREE.SpriteMaterial( { map: snesTexture, useScreenCoordinates: true, fog: false } );
	    snesLayer = new THREE.Sprite( snesMaterial );
	    snesLayer.scale.set( winWidth/ratio, winHeight/ratio, 1 );
	    snesLayer.position.set((winWidth/ratio)/2, (winHeight/ratio)/2 , 0);
	    camera.add(snesLayer);


	    //try {

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

	      var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
	      effectCopy.renderToScreen = true;

	      if(!composer)
	      	composer = new THREE.EffectComposer( renderer );

	      composer.addPass( renderModel );
	      //composer.addPass( effectCrt );
	      composer.addPass( effectCopy );

	      container.appendChild( renderer.domElement );
	      has_gl = true;

	      window.addEventListener( 'resize', this.onWindowResize, false );
				this.onWindowResize()
	    /*}
	    catch (e) {
	      // need webgl
	      session.set("message", "<P><BR><B>Note.</B> You need a modern browser that supports WebGL for this to run the way it is intended.<BR>For example. <a href='http://www.google.com/landing/chrome/beta/' target='_blank'>Google Chrome 9+</a> or <a href='http://www.mozilla.com/firefox/beta/' target='_blank'>Firefox 4+</a>.<BR><BR>If you are already using one of those browsers and still see this message, it's possible that you<BR>have old blacklisted GPU drivers. Try updating the drivers for your graphic card.<BR>Or try to set a '--ignore-gpu-blacklist' switch for the browser.</P><CENTER><BR><img src='../general/WebGL_logo.png' border='0'></CENTER>")
	      return;
	    }*/

	  },

	  onWindowResize: function( event ) {
	    winWidth = window.innerWidth;
	    winHeight = window.innerHeight - 100;
	    activeWidth = Math.round(winHeight * (4 / 3));

	    renderer.setSize( activeWidth, winHeight );

	    composer.setSize( activeWidth, winHeight );

	    effectCrt.uniforms[ 'size' ].value.x = activeWidth;
	    effectCrt.uniforms[ 'size' ].value.y = winHeight;

	    snesLayer.scale.set( activeWidth/ratio, winHeight/ratio, 1 );
	    snesLayer.position.set((activeWidth/ratio)/2, (winHeight/ratio)/2 , 0);
	  },

	  getTexture: function() {
	    return maincanvas;
	  },

	  animate: function() {
  		requestAnimationFrame( me.animate );
  		me.render();
	  },

	  render: function() {

	    time = Date.now();
	    delta = time - oldTime;
	    oldTime = time;

	    if (isNaN(delta) || delta > 1000 || delta == 0 ) {
	      delta = 1000/60;
	    }

	    effectCrt.uniforms[ 'globalTime' ].value += delta*(Math.random()*0.005);

	    snesTexture.needsUpdate = true;

	    if (snesLoaded) {
	      retroArchModule['callMain'](retroArchModule['arguments']);
	    }

	    if (has_gl) {
	      renderer.clear();
	      composer.render( 0.01 );
	    }

	  }
  }

  return me
})
