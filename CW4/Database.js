console.log("Working");
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
    constructor(id, name, gpa, courses) {
      this.id = id;
      this.name = name;
      this.gpa = gpa;
      this.courses = courses;
    }
    toString() {
      return this.id+"";
    }
  }


  class CW4 extends Menu {
    constructor() {
      super();
      var d = new Date();
      this.course1 = new Course("BLM201", d.getHours(), d.getDate(), "A101" )
      this.course2 = new Course("BLM301", d.getHours(), d.getDate(), "A103" )
      let courses = [this.course1, this.course2];
      this.student = new Student(1621221028,"YavuzSelimGugen",2.1, courses);
      this.point = new Point(3,5);
      this.point3D = new Point3D (5,6,7);
      this.distance = new Distance(12);
    }
  }
