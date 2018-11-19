"use strict";
var duration = 1000;
function changeDuration() {
  duration = document.getElementById("x-duration").value;
  console.log("changed duration: "+duration);
}
const 
  t1 = { transform: [
    "translate(0px,0px)",
    "translate(0px,100px)",
    "translate(100px,100px)",
    "translate(100px,0px)",
    "translate(0px,0px)"
    ], 
    borderRadius: ["0px", "0px"],
    background: ["yellow", "cyan", "magenta", "yellow"],
    borderColor: ["yellow", "cyan", "magenta", "yellow"]},
  t2 = { transform: ["rotate(0)", "rotate(360deg)"] },
  t3 = { background: ["yellow", "cyan", "magenta", "yellow"],
        borderColor: ["yellow", "cyan", "magenta", "yellow"] },
  t4 = { fontSize: ["100%", "150%", "100%", "75%", "100%"] },
  t5 = {transform: [
    "translate(0px,0px)", 
    "translate(200px,0px)", 
    "translate(100px,100px)",
    "translate(0px,0px)",
  ],
  borderWidth: ["50px 25px 0 25px", "50px 25px 0 25px"],
  borderColor: ["yellow black black black", "magenta black black black"],
  background: ["yellow","magenta"],
  width: ["0px", "0px"],
  height: ["0px", "0px"]}


  // Main source of below script: 
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
  var sun = new Image();
  var moon = new Image();
  var earth = new Image();
  function init() {
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
  }
  
  function draw() {
    var moonSpeed=document.getElementById("x-moonspeed").value;;
    var earthSpeed=document.getElementById("x-earthspeed").value;
    var ctx = document.getElementById('canvas').getContext('2d');
  
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300); // clear canvas
  
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
    ctx.translate(150, 150);
  
    // Earth
    var time = new Date();
    ctx.rotate(((2 * Math.PI) / earthSpeed) * time.getSeconds() + ((2 * Math.PI) / (earthSpeed*1000)) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // Shadow
    ctx.drawImage(earth, -12, -12);
  
    // Moon
    ctx.save();
    ctx.rotate(((2 * Math.PI) / moonSpeed) * time.getSeconds() + ((2 * Math.PI) / (moonSpeed*1000)) * time.getMilliseconds());
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();
  
    ctx.restore();
    
    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    ctx.stroke();
   
    ctx.drawImage(sun, 0, 0, 300, 300);
  
    window.requestAnimationFrame(draw);
  }
  
  init();
