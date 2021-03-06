console.log('Running in Crosswalk + Node.js mode');
var five = require('johnny-five');
var board = new five.Board({repl: false});

// TODO: avoid to use global variable to share
var localStream;

board.on('ready', function() {
  console.log('Johnny-Five is ready');

  var control = CreateControl(board);

  InitUI(control);

  InitServer(control);

  InitCamera();
});

function CreateControl(board) {
  var control = {board: board};
  // Plug the LED module into the
  // Grove Shield's D6 jack.
  //
  // Select an LED from the kit
  // (red, green, blue) and insert
  // it into the LED module, with
  // the long pin in + and short
  // pin in -.
  control.led = new five.Led(6);

  // Plug the Button module into the
  // Grove Shield's D4 jack
  control.button = new five.Button(4);

  // Plug the Rotary Angle sensor module
  // into the Grove Shield's A0 jack
  control.rotary = new five.Sensor("A0");

  // Plug the LCD module into any of the
  // Grove Shield's I2C jacks.
  control.lcd = new five.LCD({
    controller: "JHD1313M1"
  });

  // Plug the Temperature sensor module
  // into the Grove Shield's A1 jack
  control.thermometer = new five.Thermometer({
    controller: "GROVE",
    pin: "A1"
  });

  // Plug the Servo module
  // into the Grove Shield's D5 jack
  control.servo = new five.Servo(5);

  control.mds = [];
  // Plug the Motor Driver module
  // into the I2C jack.
  // Set the I2C address of driver
  // with 2 motors to 8.
  control.mds.push(new five.Motor({
    controller: "GROVE_I2C_MOTOR_DRIVER",
    address: 8,
    pin: "A",
  }));

  control.mds.push(new five.Motor({
    controller: "GROVE_I2C_MOTOR_DRIVER",
    address: 8,
    pin: "B",
  }));

  // Set the I2C address of driver
  // with 1 motor to 9.
  control.mds.push(new five.Motor({
    controller: "GROVE_I2C_MOTOR_DRIVER",
    address: 9,
    pin: "B",
  }));
  return control;
}

function InitCamera() {
  var localVideo = document.querySelector("#camera-preview");
  var constraints = {video: true};

  function successCallback(localMediaStream) {
    localStream = localMediaStream; // localStream available to WebRTCSignalServer
    localVideo.src = window.URL.createObjectURL(localMediaStream);
    localVideo.play();
  }

  function errorCallback(error){
    console.log("navigator.getUserMedia error: ", error);
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);
}
