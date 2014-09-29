Template.snes.rendered = function(){

  var snes9x = RetroArch.findOne({emulator: 'snes'})
  eval(snes9x.core);

  var currentRequest = null

	var Module = {
    noInitialRun: true,
  	arguments: ["/_.smc"],
    preRun: [],
    postRun: [],
    broadcastCallback:function(){
      if(roomConnection){
        var def = $.Deferred();
        def.resolve(roomConnection.send(Module.canvas.toDataURL())) 
      }
    },
    canvas: document.createElement('canvas'),
    setStatus: function(text) {
      console.log(text)
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
      this.totalDependencies = Math.max(this.totalDependencies, left);
      Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    }
  };
  Module.setStatus('Downloading...');

  require('retroarch_snes9x', function (snesProcessor) {
    snesProcessor.setModule(Module);
  });

  var request = new XMLHttpRequest();
  request.onload = function(){
    $("#loader").remove()
    var dataView = new Uint8Array(request.response);
	  Module.FS_createDataFile('/', "_.smc", dataView, true, false);

	  Module.FS_createFolder('/', 'etc', true, true);
    var retroarchConfig = null
	  require('retroarch_config', function(config){
      retroarchConfig = config
    })

	  Module.FS_createDataFile('/etc', 'retroarch.cfg', retroarchConfig, true, true);

	  /*document.getElementById('canvas_div').style.display = 'block';
	  document.getElementById('vsync').disabled = true;
	  document.getElementById('vsync-label').style.color = 'gray';
	  document.getElementById('latency').disabled = true;
	  document.getElementById('latency-label').style.color = 'gray';*/
	  Module['callMain'](Module['arguments']);

	  var display = require("display")
	  display.init(false, Module.canvas, "snes");
	  display.animate();
  };
  request.open('GET', Session.get("game_path"), true);
  request.responseType = "arraybuffer";
  request.send();
}
