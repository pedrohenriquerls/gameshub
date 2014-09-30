Template.snes.rendered = function(){

  Meteor.call("getRetroarchCore", "snes", function(error, snes9xCore){
    eval(snes9xCore);

    var retroarchModule = require("retroarch_module")
    retroarchModule.initialize("retroarch_snes9x", "smc")
    retroarchModule.run(Session.get("game_path"))
  })
}
