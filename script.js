/*
  Don't use such school pascal lessons style
  It is very hard to get what is going on in your code :)

  A lot of hardcoded values

  Why arr is global if you use it only in the one routine
*/
var arr = [],
  box,
  ei,
  ej;

function swap(arr, i1, j1, i2, j2) {
  /*
    without keyword it is a global variable
  */
  t = arr[i1][j1];
  arr[i1][j1] = arr[i2][j2];
  arr[i2][j2] = t;
}

/*
  Use of DOM Level 2 events (addEventListener) is better practice
*/
window.onload = function() {
  box = document.getElementById("box");
  newGame();
  document.getElementById("reset").onclick = newGame;
};

/*
  Code is very messy
  You have to divide logic for more routines
  instead of having all in one
*/
function cellClick(event) {
  /*
    No need for redeclare of event
    It is old style when you couldn't be sure that event is passed
    As far as you handle event on the right element you get right vent object

    Bad idea to use element`s id as data storage
    event.target instead of event.srcElement or just 'this' as long as you hadn't overrided context for your handler
  */
  var event = event || window.event,
    el = event.srcElement || event.target,
    i = el.id.charAt(0),
    j = el.id.charAt(2);

  /*
    A lot of nested constuctions
  */
  if (
    (i == ei && Math.abs(j - ej) == 1) ||
    (j == ej && Math.abs(i - ei) == 1)
  ) {
    document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
    el.innerHTML = "";
    ei = i;
    ej = j;
    var qj = true;

    /*
      Very strange win verification
      Could use much more simplier
    */
    for (i = 0; i < 4; ++i)
      for (j = 0; j < 4; ++j)
        if (
          i + j != 6 &&
          document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1
        ) {
          /*
            This break will return only from 1 loop
            But once you got your flag false you have to break both
          */
          qj = false;
          break;
        }

    if (qj) {
      alert("Game ower, u winner");
    }
  }
}

function newGame() {
  /* 
    You can loop 15 times and then push empty value outside the loop
    instead of using if/else
  */
  for (i = 0; i < 4; ++i) {
    arr[i] = [];
    for (j = 0; j < 4; ++j) {
      if (i + j != 6) arr[i][j] = i * 4 + j + 1;
      else arr[i][j] = "";
    }
  }

  ei = 3;
  ej = 3;

  /*
    Why 1600? More means better ? :)
    Just to ensure that array will be randomized?

    Weird way of shuffling. Much better to make simple loop
    and fill array with random number
  */
  for (i = 0; i < 1600; ++i)
    switch (Math.round(3 * Math.random())) {
      case 0:
        /*
          No need to pass ei,ej as parameters as you defined them in the global scope
        */
        if (ei != 0) swap(arr, ei, ej, --ei, ej);
        break;
      case 1:
        if (ej != 3) swap(arr, ei, ej, ei, ++ej);
        break;
      case 2:
        if (ei != 3) swap(arr, ei, ej, ++ei, ej);
        break;
      case 3:
        if (ej != 0) swap(arr, ei, ej, ei, --ej);
    }

  var table = document.createElement("table"),
    tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (i = 0; i < 4; ++i) {
    var row = document.createElement("tr");
    for (j = 0; j < 4; ++j) {
      var cell = document.createElement("td");
      cell.id = i + " " + j;
      cell.onclick = cellClick;
      cell.innerHTML = arr[i][j];
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }

  /*
    No need for this verification
    Just clean box content (box.innerHTML = '') and insert your table
  */
  if (box.childNodes.length == 1) box.removeChild(box.firstChild);
  box.appendChild(table);
}
