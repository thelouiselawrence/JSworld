var DemoData = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var window_height = window.innerHeight;
  var window_width = window.innerWidth;

  canvas.height = window_height/2;
  canvas.width = window_width/2;

  var scale = 4;
  var pixel9 =  window_height / 4;
  var pixel8 = 0.5 * pixel9; // size of large terrain blocks
  var pixel7 = 0.5 * pixel8; // size of medium terrain blocks
  var pixel6 = 0.5 * pixel7; // size of small terrain blocks
  var pixel5 = 0.5 * pixel6; // size of large building blocks, used in buildings
  var pixel4 = 0.5 * pixel5; // size of characters limb length and size fo small building blocks
  var pixel3 = 0.5 * pixel4; // size of characters main unit - limb width
  var pixel2 = 0.5 * pixel3; // size of small things, flower stalks
  var pixel1 = 0.5 * pixel2; // smallest possible detail possible, used for facial expressesions

  var rescale = function(scale) {
    pixel9 = window_height / scale;
    pixel8 = 0.5 * pixel9;
    pixel7 = 0.5 * pixel8;
    pixel6 = 0.5 * pixel7;
    pixel5 = 0.5 * pixel6;
    pixel4 = 0.5 * pixel5;
    pixel3 = 0.5 * pixel4;
    pixel2 = 0.5 * pixel3;
    pixel1 = 0.5 * pixel2;
  };


  var noise = function(size, smoothness, roughness, min, max) {
    var whiteNoise = new Array(size + 1);
    for (var i = 0; i < whiteNoise.length; i++) {
      whiteNoise[i] = Math.random();
    }
    var resultingNoise = [];
    for (var i = 0; i < size; i++) {
      var redNoise = (whiteNoise[i] + whiteNoise[i+1]) * smoothness;
      var violetNoise = (whiteNoise[i] - whiteNoise[i+1]) * roughness;
      resultingNoise.push(redNoise + violetNoise);
    }
    return resultingNoise;
  };

  var noise1 = noise(9, 0.6, 0.4, 0, 1);


  var drawLine = function(points) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    context.strokeStyle = "rgb(127,127, 127)";
    for (var i = 0; i < points.length-2; i=i+2) {
      context.moveTo(points[0], points[1]);
      context.lineTo(points[2], points[3]);
      context.stroke();
    }
  };

  alert("so far, so good");
};

// TODO add a random number generator that can be seeded

function loadDemo() {
  alert("init");
  DemoData();
  //d.drawLine(120, 120, 240, 480, 360, 360);
  alert("finis");
}
