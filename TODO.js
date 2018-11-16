
var todos=[];
var todosWeek=[];
var listSelected;
var lists = document.getElementsByClassName('lists');
//The function below finds today's day and then puts the dat it collects into the element with the id "date."
function setDate(){
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
    var todaysDate = new Date();
    var formattedDate;

    formattedDate = days[todaysDate.getDay()] + " " + months[todaysDate.getMonth()] + " " + todaysDate.getDate() + "," + " " + todaysDate.getFullYear();

    document.getElementById('date').innerHTML = formattedDate;
}
//This function gets the id of which to do table you are trying to add to.
function selectList(op){
  listSelected = op.getAttribute("id");
}
//This function takes the information put in the input when you click the add item button for the daily list and pushes it into the putTextInTable function while also giving the input a done value of false.
function addItemPrompt(){
  var itemName = prompt("What would you like to do today?");

  if (itemName) {
    todos.push({"name": itemName, "done": false});

    putTextInTable();
  }
}
//This function does essentially the same as the one above but it pushes the input, done value of false and a second input for the day of the week.
function addWeekItemPrompt(){
  var itemName = prompt("What would you like to do this week?");
  var whichDay = prompt("What day must you do this?");

  if (itemName) {
    todosWeek.push({"name": itemName, "done": false, "day": whichDay});

    putTableWeek();
  }
}
//This function changes between the unchecked and checked square when you click on the square for the daily list.
function checkTheBox(thisTD){
  var box = thisTD.parentElement.getAttribute("id");

  if(box == "toDoList"){
    listSelected = "addItem";
  }

  thisTD.innerHTML+= "<td onclick='checkTheBox(this)'><i class='far fa-check-square' class='checkbox'></i></td>";

  var index = thisTD.parentElement.rowIndex;

  if (todos[index].done){
         todos[index].done = false;

  } else {
    todos[index].done = true;
  }
  putTextInTable();
}
//This function accomplishes the same as the one above, however this one affects the check boxes in the weekList.
function checkTheBoxWeek(thisTD){
  var box = thisTD.parentElement.getAttribute("id");

  if(box == "weeklist"){
    listSelected = "newItem";
  }

  thisTD.innerHTML+= "<td onclick='checkTheBoxWeek(this)'><i class='far fa-check-square' class='checkbox'></i></td>";

  var index = thisTD.parentElement.rowIndex;

  if (todosWeek[index].done){
         todosWeek[index].done = false;

  } else {
    todosWeek[index].done = true;

  }
  putTableWeek();
}
//This function creates the table(or list cause it is a to do list) elements and adds the text to the table items and then adds those items to the table.
function putTextInTable(){
    var toDoList = document.getElementById("toDoList");
    toDoList.innerHTML= "";

    for (var i = 0; i < todos.length; i++){
      var itemNode = document.createTextNode(todos[i].name);
      var newRow = document.createElement('tr');
      var itemTd = document.createElement('td');
      newRow.appendChild(itemTd);
      itemTd.appendChild(itemNode);
      toDoList.appendChild(newRow);

      if (todos[i].done == true){
      newRow.innerHTML+= "<td onclick='checkTheBox(this)'><i class='far fa-check-square' class='checkbox'></i></td>";

      } else {
        newRow.innerHTML+= "<td onclick='checkTheBox(this)'><i class='far fa-square' class='checkbox'></i></td>";
    }
  }
  changeEmojiDay();
}
//This function allows the user to enter items into the weekList in an order that is not the days of the week. It makes sure that the days of the week are always in the correct order. For example, a Monday event will always be placed before a Friday.
//It does this by reordering the array "todosWeek" so that the ones with a certain day appear in the right order.
function order(todosWeek){
  var newTodosWeek = [];

  for(var i=0; i<todosWeek.length; i++){

    if(todosWeek[i].day.toLowerCase() == "monday"){
      newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == "tuesday"){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == "wednesday"){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == "thursday"){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == "friday"){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == "saturday"){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == "sunday"){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    for(var i=0; i<todosWeek.length; i++){
      if(todosWeek[i].day.toLowerCase() == ""){
        newTodosWeek.push(todosWeek[i]);
      }
    }
    return newTodosWeek;
  }
//This function takes the information from the prompts and adds them to the weekList table. It connects the test to the table elements and then those elements to the table.
function putTableWeek(){
  var weekList = document.getElementById("weekList");
  weekList.innerHTML= "";
  todosWeek = order(todosWeek);

  for (var i = 0; i < todosWeek.length; i++){
    var itemNode = document.createTextNode(todosWeek[i].name);
    var newRow = document.createElement('tr');
    var itemTd = document.createElement('td');

    newRow.appendChild(itemTd);
    itemTd.appendChild(itemNode);
    weekList.appendChild(newRow);

    if (todosWeek[i].done == true){
    newRow.innerHTML+= "<td onclick='checkTheBoxWeek(this)'><i class='far fa-check-square' class='checkbox'></i></td>";

    } else {
      newRow.innerHTML+= "<td onclick='checkTheBoxWeek(this)'><i class='far fa-square' class='checkbox'></i></td>";
    }

    var lis = document.getElementById("weekList");
//This part of the function adds the column that includes what day of the week the item must be completed.
    if(todosWeek[i].day.toLowerCase() == "monday"){
      newRow.innerHTML+= "<td>Monday</td>";

    } else if(todosWeek[i].day.toLowerCase() == "tuesday"){
      newRow.innerHTML+= "<td>Tuesday</td>";

    } else if(todosWeek[i].day.toLowerCase() == "wednesday"){
      newRow.innerHTML+= "<td>Wednesday</td>";

    } else if(todosWeek[i].day.toLowerCase() == "thursday"){
      newRow.innerHTML+= "<td>Thursday</td>";

    } else if(todosWeek[i].day.toLowerCase() == "friday"){
      newRow.innerHTML+= "<td>Friday</td>";

    } else if(todosWeek[i].day.toLowerCase() == "saturday"){
      newRow.innerHTML+= "<td>Saturday</td>";

    } else if(todosWeek[i].day.toLowerCase() == "sunday"){
      newRow.innerHTML+= "<td>Sunday</td>";

    }else{
      newRow.innerHTML+= "<td>Anytime this week</td>";
    }
  }
  changeEmojiWeek();
}

var quote = ["You can do it!", "It is possible.", "Don't worry, work always gets done."];
//This function chooses a random quote from the array "quote" and turns that quote into the innerHTML of the element with the id "quote."
function setQuote(){
  var min = 0;
  var max = 3;
  var random = Math.floor(Math.random() * (+max - +min)) + +min;

  document.getElementById("quote").innerHTML = quote[random];
}
//This function changes the emoji next to the daily list based on how many events the user has entered.
function changeEmojiDay(){
  var em = document.getElementById("toDoList").childElementCount;

  if(em == 0){
    document.getElementById("emojiDay").innerHTML = "😀";

  }else if(em < 3){
    document.getElementById("emojiDay").innerHTML = "🙄";

  }else if(em < 5){
    document.getElementById("emojiDay").innerHTML = "😞";

  }else if(em < 7){
    document.getElementById("emojiDay").innerHTML = "😰";

  }else if(em < 9){
    document.getElementById("emojiDay").innerHTML = "🤯";

  }else{
    document.getElementById("emojiDay").innerHTML = "🤬";
  }
}
//This does the same as the function above, but for the weekList table.
function changeEmojiWeek(){
  var em = document.getElementById("weekList").childElementCount;

  if(em == 0){
    document.getElementById("emojiWeek").innerHTML = "😀";

  }else if(em < 3){
    document.getElementById("emojiWeek").innerHTML = "🙄";

  }else if(em < 5){
    document.getElementById("emojiWeek").innerHTML = "😞";

  }else if(em < 7){
    document.getElementById("emojiWeek").innerHTML = "😰";

  }else if(em < 9){
    document.getElementById("emojiWeek").innerHTML = "🤯";

  }else{
    document.getElementById("emojiWeek").innerHTML = "🤬";
  }
}
