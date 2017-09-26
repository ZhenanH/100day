var cellTexts = ["1","2","3","4","5","6","7","8","9","*","0","#"];

  for(var i = 0;i<12;i++){
    var cell = document.createElement("div");
    cell.classList="cell";
    cell.addEventListener("click", handleOnCellClick, false);
    cell.setAttribute("data-num",cellTexts[i]);
    
    var text = document.createElement("div");
    text.classList="text";
    text.innerHTML=cellTexts[i];
    cell.appendChild(text);

    document.getElementById("pad").appendChild(cell);
       //add ripple 
       var rippleWidth = Math.min(cell.offsetWidth, cell.offsetHeight);
       var rippleEle = document.createElement("div");
       rippleEle.style.width = rippleWidth+"px";
       rippleEle.style.height = rippleWidth+"px";
       rippleEle.style.left = (cell.offsetWidth - rippleWidth)/2+"px";
       rippleEle.style.top = (cell.offsetHeight - rippleWidth)/2+"px";
       rippleEle.classList = "ripple";
       cell.appendChild(rippleEle);

     }

     document.querySelector("#pad-input .deleteButton").addEventListener("click", handleDelete);

     function handleDelete(evt){
       var inputTarget = document.querySelector("#pad-input input");
       inputTarget.value =  inputTarget.value.substring(0, inputTarget.value.length-1);
       handleFormat(inputTarget);
     }

     function handleOnCellClick(evt){
       var inputTarget = document.querySelector("#pad-input input");
       inputTarget.value += evt.target.getAttribute("data-num");
       handleFormat(inputTarget);
       addAnimation(evt); 
     }

     function handleFormat(inputTarget){
       var value =  inputTarget.value.replace(/\D/g,"");

       if(value.length < 4 || value.length > 10 ){
     //333 or 33333333333

     inputTarget.value = value;
   }else if(value.length >= 4 && value.length < 7 ){
    //(333)333

    var inputArray = value.split("");
    inputArray.splice(0,3,"("+inputArray.slice().splice(0,3).join("")+")");
    inputTarget.value = inputArray.join("");
  }else{

    var inputArray = value.split("");
    inputArray.splice(0,3,"("+inputArray.slice().splice(0,3).join("")+")");
    inputArray.splice(4,4,"-"+inputArray.slice().splice(4,4).join(""));
    inputTarget.value = inputArray.join("");

  }
}

function addAnimation(evt){
  var target = evt.target;
  var cellBound = target.getBoundingClientRect();

  var translateX = evt.clientX - (cellBound.left+(cellBound.right-cellBound.left)/2);
  var translateY = evt.clientY - (cellBound.top+(cellBound.bottom-cellBound.top)/2);

  var rippleEle = target.querySelector('.ripple');
  rippleEle.style.transform = "translate("+translateX+"px,"+translateY+"px)";
  var animation = evt.target.querySelector('.ripple').animate([
    {transform:"translate("+translateX+"px,"+translateY+"px) scale(1.5)",opacity:1},
    {transform:"scale(0.5)",opacity:0.5},
    {transform:"translate(0,0) scale(1)",opacity:0}
    ],200);

  animation.onfinish = function(){
    rippleEle.style.transform = "translate(0,0)";
  };
}