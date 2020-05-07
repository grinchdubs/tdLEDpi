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

var net = require('net');
var server1 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
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
    var offset = 170;
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

var server3 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
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

var server4 = net.createServer(function(c) { //'connection' listener
  var parseState = 0;
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
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
var GammaLUT=new Uint8Array([0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,13,$

function rgb2int(r, g, b) {
  if (GAMMA_CORRECT) {
    return (GammaLUT[r & 0xff] << 16) | (GammaLUT[g & 0xff] << 8) | (GammaLUT[b & 0xff]);
  }
  else {
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
  }
}



