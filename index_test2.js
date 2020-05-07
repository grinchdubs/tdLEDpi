/* jslint node: true */
'use strict';


var receivedDataCount = 0;
var ws281x = require('rpi-ws281x-native');
var NUM_LEDS = parseInt(process.argv[2], 600) || 600;
var pixelsUint32 = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
var GAMMA_CORRECT = true;


// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});


var opcparse = require('../opcparse.js');


// Universe 1
var net = require('net');
var server1 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
    // Starting Pixel in Universe 1
    var offset = 0;
    opcparse.parseOPC(data, function(rgb, count) {
// console.log('rgb count', count);
      for (var i = 0; i < count; i+=3) {
        pixelsUint32[offset + i/3] = rgb2int(rgb[i],rgb[i+1],rgb[i+2]);
      }
      receivedDataCount++;
        if(receivedDataCount == 4){
          receivedDataCount = 0;
       ws281x.render(pixelsUint32);
        }
    });
  });
});


// Universe 2
server1.listen(7890, function() { //'listening' listener
  console.log('server bound');
});


var server2 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
    // Starting Pixel in Universe 2
    var offset = 171;
    opcparse.parseOPC(data, function(rgb, count) {
// console.log('rgb count', count);
      for (var i = 0; i < count; i+=3) {
        pixelsUint32[offset + i/3] = rgb2int(rgb[i],rgb[i+1],rgb[i+2]);
      }
      receivedDataCount++;
        if(receivedDataCount == 4){
          receivedDataCount = 0;
       ws281x.render(pixelsUint32);
        }
    });
  });
});


server2.listen(7891, function() { //'listening' listener
  console.log('server bound');
});


// Universe 3
var server3 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
    // Starting Pixel in Universe 3
    var offset = 272;
    opcparse.parseOPC(data, function(rgb, count) {
// console.log('rgb count', count);
      for (var i = 0; i < count; i+=3) {
        pixelsUint32[offset + i/3] = rgb2int(rgb[i],rgb[i+1],rgb[i+2]);
      }
      receivedDataCount++;
        if(receivedDataCount == 4){
          receivedDataCount = 0;
       ws281x.render(pixelsUint32);
        }
    });
  });
});


server3.listen(7892, function() { //'listening' listener
  console.log('server bound');
});


// Universe 4
var server4 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
    // Starting Pixel in Universe 4
    var offset = 408;
    opcparse.parseOPC(data, function(rgb, count) {
// console.log('rgb count', count);
      for (var i = 0; i < count; i+=3) {
        pixelsUint32[offset + i/3] = rgb2int(rgb[i],rgb[i+1],rgb[i+2]);
      }
      receivedDataCount++;
        if(receivedDataCount == 4){
          receivedDataCount = 0;
       ws281x.render(pixelsUint32);
        }
    });
  });
});


server4.listen(7893, function() { //'listening' listener
  console.log('server bound');
});


// gamma = 2.2
var GammaLUT=new Uint8Array([0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,13,13,14,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,22,22,23,23,24,24,25,26,26,27,28,28,29,30,30,31,32,32,33,34,34,35,36,37,37,38,39,40,41,41,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,60,61,62,63,64,66,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,85,86,87,88,89,91,92,93,94,96,97,98,100,101,102,104,105,106,108,109,110,112,113,115,116,118,119,120,122,123,125,126,128,129,131,132,134,136,137,139,140,142,143,145,147,148,150,152,153,155,157,158,160,162,163,165,167,169,170,172,174,176,177,179,181,183,185,187,188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,232,234,236,238,240,242,245,247,249,251,253,255]);

function rgb2int(r, g, b) {
  if (GAMMA_CORRECT) {
    return (GammaLUT[r & 0xff] << 16) | (GammaLUT[g & 0xff] << 8) | (GammaLUT[b & 0xff]);
  }
  else {
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
  }
}
