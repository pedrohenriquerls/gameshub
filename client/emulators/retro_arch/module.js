define("retroarch_module", [], function(){
  var Module = {
    noInitialRun: true,
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
  var filename = null
  return {
    initialize: function(platform, ext){
      filename = "_."+ext
      Module.arguments = ["/"+filename]

      var processor = require(platform)
      processor.setModule(Module);
    },
    run: function(gamePath){
      var request = new XMLHttpRequest();
      request.onload = function(){
        $("#loader").remove()
        var dataView = new Uint8Array(request.response);
        Module.FS_createDataFile('/', filename, dataView, true, false);

        Module.FS_createFolder('/', 'etc', true, true);
        var retroarchConfig = null
        require('retroarch_config', function(config){
          retroarchConfig = config
        })

        Module.FS_createDataFile('/etc', 'retroarch.cfg', retroarchConfig, true, true);
        Module['callMain'](Module['arguments']);

        var display = require("display")
        display.init(false, Module.canvas, "snes");
        display.animate();
      };
      request.open('GET', gamePath, true);
      request.responseType = "arraybuffer";
      request.send();
    }
  }
})
