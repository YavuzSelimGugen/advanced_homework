
console.log("wokring")
var class_works = [
    {
        "name": "Classwork1",
        "meta": "A char counter of given text.",
        "link": "counter.html"
    },
    {
        "name": "Classwork2",
        "meta": "Array Methods",
        "link": "CW2.html"
    },
    {
        "name": "Classwork3",
        "meta": "Inspector",
        "link": "CW3/inspector.html"
    },
    {
        "name": "Classwork4",
        "meta": "Class examples on inspector",
        "link": "CW4/index.html"
    },
    {
        "name": "Classwork5",
        "meta": "Opening a remote file and some local files together and makes comparison",
        "link": "CW5/main.html"
    },
    {
        "name": "Classwork6",
        "meta": "Making performance comparison between Array and Map on a students data",
        "link": "CW6/Timing.html"
    },
    {
        "name": "Classwork7",
        "meta": "Build an HTML table using some tabular data",
        "link": "CW7/index.html"
    },
    {
        "name": "Classwork9",
        "meta": "How to use and manipulate SVG",
        "link": "CW9/index.html"
    }
]
var home_works = [
    {
        "name": "Homework1",
        "meta": "",
        "link": "HW1.html" 
    },
    {
        "name": "Homework2",
        "meta": "",
        "link": "HW2/database.html" 
    },
    {
        "name": "Homework3",
        "meta": "",
        "link": "HW3/index.html" 
    }
]

//var cwtext = document.createTextNode= "Classworks: "
//document.getElementById("div_list").append(cwtext);
var cwtext = document.createTextNode= "Classworks: "
document.getElementById("div_list").append(cwtext);
var obj;

var cw = document.createElement("UL");
document.getElementById("div_list").appendChild(cw);
for (var i = 0; i < class_works.length; i++) {
    obj = class_works[i];
    var node = document.createElement("LI");
    node.innerHTML += 
    "<a href ='"+obj.link+"'>"+obj.name+"</a>" + ": "+ obj.meta
    cw.appendChild(node); 
}


var hwtext = document.createTextNode= "Homeworks: "
document.getElementById("div_list").append(hwtext);

var hw = document.createElement("UL");
document.getElementById("div_list").appendChild(hw);
for (var i = 0; i < home_works.length; i++) {
    obj = home_works[i];
    var node = document.createElement("LI");
    node.innerHTML += 
    "<a href ='"+obj.link+"'>"+obj.name+"</a>"
    hw.appendChild(node); 
}
