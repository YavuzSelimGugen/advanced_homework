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
    ]},
  t2 = { transform: ["rotate(0)", "rotate(360deg)"] },
  t3 = { background: ["yellow", "cyan", "magenta", "yellow"] },
  t4 = { fontSize: ["100%", "150%", "100%", "75%", "100%"] },
  t5 = {transform: [
    "translate(0px,0px)", 
    "translate(100px,0px)", 
    "translate(50px,50px)",
    "translate(0px,0px)",
  ]}

