"use strict";
console.log("Database.js is working");

const STUDENTS = [];
const COURSES = [];

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
    return {name, time, date, rooms}
}

function addCourses(txt) {
    let a = txt.split("\n");
    for(let s of a) {
      let course = parseCourses(s);
      COURSES.push(course);
    }
    db.convertCrsToMap();
    // report(msg + keys.length+" students");
}

function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
    let courses = [];
    for (let i=3; i<b.length; i++)
        courses.push(b[i]);
    return {id, name, gpa, courses};
}

function addStudents(txt) {
    let a = txt.split("\n");
    for (let s of a) {
      let std = parseStudent(s);
      STUDENTS.push(std);
    }
    db.convertStuToMap();
    // report(msg + keys.length+" students");
}

function find () {
  db.findStu();
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
  convertStuToMap() {
    console.log("Converting Students to a map object is starting.")
    for(var i =0; i < STUDENTS.length; i++) {
      this.stu_map.set(STUDENTS[i].id, STUDENTS[i]);
    }
    console.log("Converting Students to a map object is completed.")
  }
  convertCrsToMap () {
    console.log("Converting Courses to a map object is starting.")
    for(let i of COURSES) {
      this.course_map.set(i.name, i);
    }
    console.log("Converting Courses to a map object is completed.")
  }
  findStu () {
    let key = search_key.value;
    console.log(this.stu_map.get(key));
  }
}
readData("Students.txt");
readData("Courses.txt");
var db = new Database();
