


var Scenario = function()  {


  var default_scale = 4;



  var noise = function(size, smoothness, roughness, min, max) {
    var whiteNoise = new Array(size + 1);
    for (var i = 0; i < whiteNoise.length; i++) {
      var value = Math.random();
      whiteNoise[i] = Math.round(value);
    }
    var resultingNoise = [];
    for (var j = 0; j < size; j++) {
      var redNoise = (whiteNoise[i] + whiteNoise[i+1]) * smoothness;
      var violetNoise = (whiteNoise[i] - whiteNoise[i+1]) * roughness;
      resultingNoise.push(Math.round(redNoise + violetNoise));
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
    alert("all good so far");
};

// TODO add a random number generator that can be seeded

var Dimensions = function(id) {
  var height = function(id) {
    var element = document.getElementById(id);
    return element.height;
  };
  var width = function(id) {
    var element = document.getElementById(id);
    return element.width;
  };
  var resize = function(h, w, id) {
    var element = document.getElementById(id);
    element.height = h;
    element.width = w;
  };
};

// minature library for generating noise
var NOISE =  {
  whiteNoise: function(size, minimum, range) {
    var noise = [];

  }
}

// miniature library for drawing to the canvas
var DRAWING = {
  canvas: function(id) {
    return document.getElementById(id);
  },
  context: function(canvas) {
    return canvas.getContext("2d");
  },
  rescale: function(scale, altitude) {
    var pixel9 =  altitude / scale;
    var pixel8 = 0.5 * pixel9; // size of large terrain blocks
    var pixel7 = 0.5 * pixel8; // size of medium terrain blocks
    var pixel6 = 0.5 * pixel7; // size of small terrain blocks
    var pixel5 = 0.5 * pixel6; // size of large building blocks, used in buildings
    var pixel4 = 0.5 * pixel5; // size of characters limb length and size fo small building blocks
    var pixel3 = 0.5 * pixel4; // size of characters main unit - limb width
    var pixel2 = 0.5 * pixel3; // size of small things, flower stalks
    var pixel1 = 0.5 * pixel2; // smallest possible detail possible, used for facial expressesions
    return [pixel1, pixel2, pixel3, pixel4, pixel5, pixel6, pixel7, pixel8, pixel9];
  },
  resize: function(id, views) {
    var window_height=window.innerHeight;
    var window_width=window.innerWidth;
    var canvas = this.canvas(id);
    if (window_width > window_height) {
      var dimension = window_height/2;
      canvas.height = dimension;
      var possibleViews = (window_width/dimension)-1;
      if (possibleViews > views) {
        canvas.width = dimension * views;
        document.getElementById("viewSlider").value = views;
      } else {
        canvas.width = dimension * possibleViews;
        document.getElementById("viewSlider").value = possibleViews;
      }
    } else {
      dimension = window_width/2;
      canvas.height = dimension;
      canvas.width = dimension;
    }

    // canvas.height = window_height/2;
    // canvas.width = window_width/2;
    //this.rescale(scale, window_height);
  },
  noise: function(size, min, max) {
    var whiteNoise = new Array(size + 1);
    for (var i = 0; i < whiteNoise.length; i++) {
      whiteNoise[i] = Math.random();
    }
    return whiteNoise;
  },
  smooth: function(noise, value) {
    var resultingNoise = [];
    for (var i = 1; i < noise.length; i++) {
      var redNoise = (whiteNoise[j] + whiteNoise[j-1]) * value;
      resultingNoise.push(redNoise);
    }
    return resultingNoise;
  },
  rough: function(noise, value) {
    var resultingNoise = [];
    for (var i = 1; i < noise.length; i++) {
      var violetNoise = (whiteNoise[j] - whiteNoise[j-1]) * value;
      resultingNoise.push(violetNoise);
    }
    return resultingNoise;
  },
  lineSegment: function (x0, y0, x1, y1, id) {
    var can = document.getElementById(id);
    var c = can.getContext("2d");
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.stroke();
  }
};

function drawNoise(id, size, smoothness, roughness, min, max, frequency, scale) {
  DRAWING.resize(id, scale); // used for clearing the screen
  var noise = DRAWING.noise(size, min, max);

  var increment = window.innerHeight/frequency; // equivalent of a frequency value
  var altitude = (noise[i] * scale);

  var x =  increment;
  var y = (noise[0] * scale);

  DRAWING.lineSegment(0, y, x, y, id);
  for (var i = 1; i < noise.length; i++) {
    x = i * increment;
    y = (noise[i] * scale);

    DRAWING.lineSegment(x, (noise[i-1] * scale), x, y, id);
    DRAWING.lineSegment(x, y, x + increment, y, id);
  }
}

function sketchDemo() {
  var id = "c";
  var views = document.getElementById("viewSlider").value;
  DRAWING.resize(id, views);
  var size = Math.pow(document.getElementById("sizeSlider").value * 2, 2);
  var smoothness = document.getElementById("smoothSlider").value;
  var roughness = document.getElementById("roughSlider").value;
  var min = document.getElementById("minSlider").value;
  var max = document.getElementById("maxSlider").value;
  var frequency = document.getElementById("freqSlider").value;
  var scale = document.getElementById(id).height/document.getElementById("scaleSlider").value; // increment value
  // drawNoise(id, size, smoothness, roughness, min, max, frequency, scale);
  var noise = DRAWING.noise(size, min, max);
  var resultingNoise =  DRAWING.smooth(noise, smoothness);
  resultingNoise = DRAWING.rough(noise, roughness);
  var x = scale;
  var y = resultingNoise[0] * scale;

  DRAWING.lineSegment(0, y, x, y, id);
  for (var i = 1; i < noise.length; i++) {
    x = i * increment;
    y = (noise[i] * scale);

    DRAWING.lineSegment(x, (noise[i-1] * scale), x, y, id);
    DRAWING.lineSegment(x, y, x + scale, y, id);
  }

}

function createNewDemo() {
  alert("working");
}

function refresh() {
  // needs to get values from inputs

  drawNoise("c", 20, 1, 0, 0, 1, 10, 200);
}

function init() {

}

function loadDemo() {
  DRAWING.resize( "c", 1);
  // drawNoise("c",12, 0.6, 0.4, 0, 1, 10, 250);

  // TODO make a NOISE object
  sketchDemo();

}
