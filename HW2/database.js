"use strict";
console.log("Database.js is working");

function report(msg, id, list) {
    // out.innerHTML += "<br>"; msg += " ";
    // out.appendChild(document.createTextNode(msg));
    // let n1;
    // if (id) {
    //     n1 = document.createElement("span");
    //     n1.appendChild(document.createTextNode(id));
    //     n1.classList.add("link");
    //     out.appendChild(n1); msg += id;
    //     //n1.addEventListener("click", doClick);
    // }
    // if (list) {
    //     let n2 = document.createElement("span");
    //     n2.appendChild(document.createTextNode(""));
    //     n2.innerHTML += list.join("<br>");
    //     n2.classList.add("course");
    //     if (n1) n1.appendChild(n2);
    // }
    // console.log(msg);
}

const url = "https://maeyler.github.io/JS/data/";
function readData(file) {
    console.log("readData "+file);
    if(file.includes("Student")) {
      fetch(url+file)
          .then(r => r.text(), report)
          .then(addStudents, report);
    }
    if(file.includes("Courses")) {
      fetch(url+file)
          .then(r => r.text(), report)
          .then(addCourses, report);
    }
}

function parseCourses (line) {
    let b = line.split("\t");
    let name = b[0], time = b[1], date = b[2];
    let rooms = [];
    for (var i = 3; i < b.length; i++) {
      rooms.push(b[i]);
    }
    return new Course(name, time, date, rooms);
}

function addCourses(txt) {
    let a = txt.split("\n");
    for(let s of a) {
      let course = parseCourses(s);
      db.addCrsToMap(course);
    }

    // report(msg + keys.length+" students");
}

function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
    let courses = [];
    for (let i=3; i<b.length; i++)
        courses.push(b[i]);
    return new Student(id, name, gpa, courses);
}

function addStudents(txt) {
    let a = txt.split("\n");
    for (let s of a) {
      let std = parseStudent(s);
      db.addStuToMap(std);
    }

    // report(msg + keys.length+" students");
}

class Course {
  constructor(name, time, date, rooms) {
    this.name = name;
    this.time = time;
    this.date = date;
    this.rooms = rooms;
  }
  toString() {
    return this.name
  }
}

class Student {
  constructor(id, name, gpa, courses=[]) {
    this.id = id;
    this.name = name;
    this.gpa = gpa;
    this.courses = courses;
  }
  toString() {
    return this.id+"";
  }
}

class Database {
  constructor() {
    this.stu_map = new Map();
    this.course_map = new Map();
  }
  addStuToMap(stu) {
      this.stu_map.set(stu.id, stu);
  }
  addCrsToMap (course) {
    this.course_map.set(course.name, course);
  }
  findStu (key) {
    let result = this.stu_map.get(key)
    console.log(result);
    // document.getElementById("DisplayStu").innerHTML += console.table(result);
    return result;
  }
  getStuCourses (key) {
    let stu = this.findStu(key);
    console.log(stu);
    return stu.courses;
  }

  getStuSchedule (key) {
    let stu = this.findStu(key);
    let list = ""
    for (let c of stu.courses) {
      let course = this.course_map.get(c)
      console.log(course)
      list+= (course.name)+" "+(course.date)+" "+ course.time +", ";
    }
    return list;
  }
  stuListOfCourse (key) {
    let list = [];
    // this.stu_map
    for(let s of this.stu_map.values()){
      if(s.courses.includes(key)){
        list.push(s.id+" "+s.name);
      }
    }
    console.log(list);
    return list;
  }
  random () {
    var arr = Array.from(this.stu_map);
    return arr[[Math.floor(Math.random()*arr.length)]][0]
  }

  randomRoom() {
    var arr = Array.from(this.course_map);
    return arr[[Math.floor(Math.random()*arr.length)]][1].rooms[0];
  }

  numberGPA (key) {
    var counter = 0;
    for(let s of this.stu_map.values()) {
      if(key < s.gpa){
          counter ++;
      }
    }
    console.log(counter)
    return counter
  }
  crsListOfRoom (key) {
    var list = [];
    for(let c of this.course_map.values()) {
      if(c.rooms.includes(key)){
        list.push(c.name);
      }
    }
    console.log(list);
    return list;
  }

  crsNumbrOfRoom (key) {
    let counter = 0;
    for(let c of this.course_map.values()) {
      if(c.rooms.includes(key)){
        counter++;
      }
    }
    console.log(counter);
    return counter;
  }
}

readData("Students.txt");
readData("Courses.txt");
var db = new Database();

// Window Functions Declared Below

function random() {
  RandomStu.innerText = db.random();
}

function randomRoom() {
  RandomRoom.innerText = (db.randomRoom());
}

function numberGPA () {
  DPAID.innerText = db.numberGPA(gpa_key.value)
}

function find () {
  DisplayStu.innerText = db.findStu(document.getElementById('stu_key').value).name;
}

function getStuCourses() {
  StuCourses.innerText = db.getStuCourses(document.getElementById('stu_key').value);
}

function getStuSchedule() {
  StuSchedule.innerText = db.getStuSchedule(document.getElementById('stu_key').value);
}
function stuListOfCourse() {
  StuList.innerText = db.stuListOfCourse(document.getElementById('course_key').value);
}
function crsListOfRoom() {
  crsList.innerText = db.crsListOfRoom(document.getElementById('room_key').value)
}
function crsNumbrOfRoom() {
numberRoom.innerText=  db.crsNumbrOfRoom(document.getElementById('room_key').value)
}
