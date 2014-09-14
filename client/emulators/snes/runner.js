Template.snes.rendered = function(){
  var Module = {
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

  var core = require("snes_core")
  core.setModule(Module)

  var display = require("display")
  function loadRom( url ) {
    var request = new XMLHttpRequest();
    request.onload = function(){
      Module.FS_createDataFile("/", "_.smc", new Uint8Array(request.response) , true, true);
      core.snesStart();

      display.init(true, Module.mainCanvas, "snes");
      display.animate();
    };
    request.open('GET', url, true);
    request.responseType = "arraybuffer";
    request.send();
  }
  loadRom(Session.get("game_path"))
}