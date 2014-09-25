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
	  var config = '####### Player 1 #######\ninput_player1_b = "z"\ninput_player1_a = "x"\ninput_player1_y = "a"\ninput_player1_x = "s"\ninput_player1_select = "ctrl"\ninput_player1_start = "shift"\ninput_player1_up = "up"\ninput_player1_down = "down"\ninput_player1_left = "left"\ninput_player1_right = "right"\ninput_player1_l = "q"\ninput_player1_r = "w"\n\n####### Player 2 #######\ninput_player2_b = "j"\ninput_player2_a = "k"\ninput_player2_y = "u"\ninput_player2_x = "i"\ninput_player2_select = "n"\ninput_player2_start = "m"\ninput_player2_up = "y"\ninput_player2_down = "b"\ninput_player2_left = "g"\ninput_player2_right = "h"\ninput_player2_l = "c"\ninput_player2_r = "v"\n\n####### Bad Extras #######\ninput_pause_toggle = "scrolllock"\ninput_toggle_fullscreen = "scrolllock"\ninput_toggle_fast_forward = "scrolllock"\ninput_enable_hotkey_btn = "scrolllock"\ninput_exit_emulator_btn = "scrolllock"\ninput_turbo_period = "scrolllock"\ninput_turbo_duty_cycle = "scrolllock"\ninput_hold_fast_forward = "scrolllock"\ninput_shader_next = "scrolllock"\ninput_shader_prev = "scrolllock"\ninput_rewind = "scrolllock"\ninput_movie_record_toggle = "scrolllock"\ninput_frame_advance = "scrolllock"\ninput_reset = "scrolllock"\ninput_dsp_config = "scrolllock"\ninput_slowmotion = "scrolllock"';
	  config += 'audio_enable = false\n'
	  config += 'audio_latency = 150\n'
	  config += 'video_vsync = false\n';

	  Module.FS_createDataFile('/etc', 'retroarch.cfg', config, true, true);

	  /*document.getElementById('canvas_div').style.display = 'block';
	  document.getElementById('vsync').disabled = true;
	  document.getElementById('vsync-label').style.color = 'gray';
	  document.getElementById('latency').disabled = true;
	  document.getElementById('latency-label').style.color = 'gray';*/
	  Module['callMain'](Module['arguments']);

    setInterval(function(){
      if(roomConnection)
        roomConnection.send(Module.canvas.toDataURL())
    }, 50)

	  var display = require("display")
	  display.init(false, Module.canvas, "snes");
	  display.animate();
  };
  request.open('GET', Session.get("game_path"), true);
  request.responseType = "arraybuffer";
  request.send();
}
