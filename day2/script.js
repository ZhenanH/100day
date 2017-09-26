
document.querySelector(".hero .toggle-menu").addEventListener("click", onMenuClick);

function onMenuClick(evt){

  document.querySelector(".hero .menu-button").classList.toggle("active");
  
  document.querySelector(".toggle-menu").classList.toggle("active");
  
  document.querySelectorAll(".hero i").forEach(function(e){
    e.classList.toggle("active");
  });
}


var taskList = [{
  title:"Team Meeting",
  detail:"Monthly review",
  time:"10 AM"
},
{
  title:"Project Review",
  detail:"Meet Wayne",
  time:"11 AM"
},
{
  title:"Lunch With Team",
  detail:"Cafe",
  time:"12 PM"
},
{
  title:"Walk Around Building",
  detail:"Waterview Dr",
  time:"1 PM"
},
{
  title:"Prototyping",
  detail:"100 day project",
  time:"2 PM"
},
{
  title:"Afternoon Team",
  detail:"My Cube",
  time:"3 PM"
},
{
  title:"Code Review",
  detail:"Prototype Project",
  time:"4 PM"
},
{
  title:"Design Exercise",
  detail:"Mind Map",
  time:"5 PM"
}];

for(var i=0;i<8;i++){
  var dot = document.createElement('div');
  dot.classList = "dot"

  var task = document.createElement('div');
  task.classList = "task";

  var taskname = document.createElement('div');
  taskname.classList = "taskName";

  var time = document.createElement('div');
  time.classList = "taskTime"

  var type = document.createElement('div');
  type.classList = "taskType"

  taskname.innerHTML = taskList[i].title;
  time.innerHTML = taskList[i].time;
  type.innerHTML = taskList[i].detail;

  if(i===2||i===5){
    dot.classList += " normal";
  }else if(i===4||i===7){
    dot.classList += " expiring";
  }else {
    dot.classList += " done";
  }
  task.appendChild(taskname);
  task.appendChild(time);
  task.appendChild(type);
  task.appendChild(dot);

  document.querySelector(".tasks").appendChild(task);
}

document.querySelector(".hero i.fa-check-square-o").addEventListener("click", onCheckClick);
document.querySelector(".hero i.fa-bolt").addEventListener("click", onBoltClick);
document.querySelector(".hero i.fa-clock-o").addEventListener("click", onClockClick);
document.querySelector(".hero i.fa-exclamation-circle").addEventListener("click", onExclamationClick);

function onCheckClick(evt){
  document.querySelectorAll(".normal, .expiring").forEach(function(e){
    e.parentNode.classList.toggle("filterNotDone");
  });
    evt.target.classList.toggle("enable");
}

function onBoltClick(evt){
  document.querySelectorAll(".done, .expiring").forEach(function(e){
    e.parentNode.classList.toggle("filterNotNormal");

  });
    evt.target.classList.toggle("enable");
}

function onClockClick(evt){
  document.querySelectorAll(".done, .normal").forEach(function(e){
    e.parentNode.classList.toggle("filterNotExpiring");

  });
    evt.target.classList.toggle("enable");
}

function onExclamationClick(evt){
  document.querySelectorAll(".normal, .expiring").forEach(function(e){
   // e.parentNode.classList.toggle("filterNotDone");
  });
}


