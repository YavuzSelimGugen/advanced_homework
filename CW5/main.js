"use strict";

var list = [];
let remoteText;
function isText(f) {
    console.assert(f instanceof File);
    return f.type.startsWith("text") || f.name.endsWith(".md")
         || f.name.endsWith(".js") || f.name.endsWith(".java");
}

function fileSelect(t) { //target is the button
    console.assert(t == button);
    for(let f of t.files){
      var reader = new FileReader();
      const size = " "+f.size+" bytes ";
      msg.innerText = f.type+size;
      if (f.type.startsWith("image")) {
          reader.onload = function(evt) {
              const a = evt.target.result; //image source
              list.push([a,f.name]);
              console.log(f.name+size+f.type);
          };
          reader.readAsDataURL(f);
      } else if (isText(f)) {
          reader.onload = function(evt) {
              const a = evt.target.result.replace(/</g, "&lt;");
              list.push([a,f.name]);
          };
          reader.readAsText(f);
      } else {
          msg.innerText += "Unknown ";
          out.innerText = "";
      }
    }

}
// ----------------------------------------
function hide() {
    state.style.visibility = "hidden";
}

function show(v) {
    state.value = v; state.style.visibility = "";
}

function report(t, n) {
    show("OK"); setTimeout(hide, 1000);
    remoteText = (t);
    // outpre.innerText = t;
    console.log(n? n : t);
}

function readText() {
    show("FT"); // fetch text
    fetch(url.value)
      .then(r => r.text())
      //response of fetch() is r
      .then(t => report(t, t.length+" chars"));
      //response of text() is t
}
function readBlob() {
    show("FB"); // fetch blob
    fetch(url.value)
      .then(r => r.blob())  //response r
      .then(b => report(b.size+" bytes"));
}
// ----------------------------------------------

function comparison () {
  result.innerText += list.length + " tane dosya okundu. "
  for (var i = 0; i < list.length; i++) {
    if(remoteText == list[i][0]) {
      console.log(list[i][1] + ". Dosya ile ayni")
      result.innerText += list[i][1] + " Dosya ile ayni";
    } else {
      console.log((list[i][1]) + " Dosya ile farkli")
    }
  }
}
