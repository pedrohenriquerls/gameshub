define("guest_controller", [], function(){
  var m = {
    "0": 96,
    "1": 97,
    "2": 98,
    "3": 99,
    "4": 100,
    "5": 101,
    "6": 102,
    "7": 103,
    "8": 104,
    "9": 105,
    "backspace": 8,
    "tab": 9,
    "return": 13,
    "shift": 16,
    "ctrl": 17,
    "alt": 18,
    "pausebreak": 19,
    "capslock": 20,
    "escape": 27,
    " ": 32,
    "pageup": 33,
    "pagedown": 34,
    "end": 35,
    "home": 36,
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40,
    "+": 107,
    "printscreen": 44,
    "insert": 45,
    "delete": 46,
    ";": 186,
    "=": 187,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
    "z": 90,
    "*": 106,
    "-": 189,
    ".": 190,
    "/": 191,
    "f1": 112,
    "f2": 113,
    "f3": 114,
    "f4": 115,
    "f5": 116,
    "f6": 117,
    "f7": 118,
    "f8": 119,
    "f9": 120,
    "f10": 121,
    "f11": 122,
    "f12": 123,
    "numlock": 144,
    "scrolllock": 145,
    ",": 188,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
  };

  return {
    translateKeyPress: function(player, button){
      switch (button) {
        case "B":       return m.j;
        case "A":       return m.k;
        case "Y":       return m.u;
        case "X":       return m.i;
        case "SELECT":  return m.n;
        case "START":   return m.m;
        case "UP":      return m.y;
        case "DOWN":    return m.b;
        case "LEFT":    return m.g;
        case "RIGHT":   return m.h;
        case "LT":      return m.c;
        case "RT":      return m.v;
      }
    },
    fire: function(event, k) {
      var oEvent = document.createEvent('KeyboardEvent');

      // Chromium Hack
      Object.defineProperty(oEvent, 'keyCode', {
        get : function() {
          return this.keyCodeVal;
        }
      });
      Object.defineProperty(oEvent, 'which', {
        get : function() {
          return this.keyCodeVal;
        }
      });

      if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent(event, true, true, document.defaultView, false, false, false, false, k, k);
      } else {
        oEvent.initKeyEvent(event, true, true, document.defaultView, false, false, false, false, k, 0);
      }

      oEvent.keyCodeVal = k;

      if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
      }

      document.dispatchEvent(oEvent);
    },
    read: function(e){
      switch (e.which) {
        case m.z :  return "B";
        case m.x :  return "A";
        case m.a :  return "Y";
        case m.s :  return "X";
        case m.ctrl :  return "SELECT";
        case m.shift :  return "START";
        case m.up :  return "UP";
        case m.down :  return "DOWN";
        case m.left :  return "LEFT";
        case m.right :  return "RIGHT";
        case m.q :  return "LT";
        case m.w :  return "RT";
      }
    }
  }
})
