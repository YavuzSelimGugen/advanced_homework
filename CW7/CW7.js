console.log("working")
const Lessons = [
    {name: "MAT1", class: 1, room: "A103"},
    {name: "MAT2", class: 2, room: "A102"},
    {name: "BP1", class: 1, room: "B121"},
    {name: "BP2", class: 2, room: "B121"}
  ];
  function buildTableNonParam() {
    buildTable(Lessons);
  };
  function buildTable(data) {
      let table = document.createElement("table");

      let fields = Object.keys(data[0]);
      let headRow = document.createElement("tr");
      fields.forEach(function(field) {
        let headCell = document.createElement("th");
        headCell.textContent = field;
        headRow.appendChild(headCell);
      });
      table.appendChild(headRow);

      data.forEach(function(object) {
        let row = document.createElement("tr");
        fields.forEach(function(field) {
          let cell = document.createElement("td");
          cell.textContent = object[field];
          if (typeof object[field] == "number") {
            cell.style.textAlign = "right";
          }
          row.appendChild(cell);
        });
        table.appendChild(row);
      });
      var x = document.getElementsByTagName("BODY")[0];
      x.appendChild(table);

    }
