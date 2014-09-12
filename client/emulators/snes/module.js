Template.snes.rendered = function(){
  frameskip=0    
  /*frameskip_text=document.getElementById("frameskip")    
  frameskip_text.value=frameskip*/
  maincanvas=document.createElement( 'canvas' );//document.getElementById("canvas")
  if(maincanvas.webkitRequestFullScreen){
    RequestFullScreen=function(){maincanvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)}
  }
  else{
    RequestFullScreen=function(){maincanvas.mozRequestFullScreen()}
  }    
  mainctx = maincanvas.getContext("2d");
  maincanvas.width=256
  maincanvas.height=224

  imgData=mainctx.createImageData(288,224)
  cout=document.getElementById("output")

  Module = {
    preRun: [],
    postRun: [],
    print: (function() {
      return function(text) {
        console.log(text + "\n")
      };
    })(),
    printErr: function(text) {
      if (0) { // XXX disabled for safety typeof dump == 'function') {
        dump(text + '\n'); // fast, straight to the real console
      } else {
        console.error(text);
      }
    },
    canvas: document.getElementById('canvas'),
    setStatus: function(text) {
      if (Module.setStatus.interval) clearInterval(Module.setStatus.interval);
      console.log(text)
      if (text) {
        var counter = 0;
        Module.setStatus.interval = setInterval(function() {
          counter++;
          counter %= 3;
          var dots = ' ';
          for (var i = 0; i < counter; i++) dots += '.';
            dots += '*';
          for (var i = counter; i < 2; i++) dots += '.';
            document.getElementById('status').innerHTML = text.replace('...', dots);
        }, 300);
      }
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
      this.totalDependencies = Math.max(this.totalDependencies, left);
      Module.setStatus(left ? 'Preparing: ' + (this.totalDependencies-left) + '/' + this.totalDependencies + '...' : 'All downloads complete.');
    }
  };
  Module.setStatus('Downloading...');
  var i = void 0;
  require('snes_processor', function (snesProcessor) {
    snesProcessor.setModule(Module);
  });

  loadRom(Session.get("game_path"))
}