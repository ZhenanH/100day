
var itineraryContainer = document.querySelector('.itinerary');
ReactDOM.render(<div><Itinerary price={649} air={"aa.png"}/><Itinerary price={679} air={'delta.png'}/></div>,itineraryContainer);

var datepicker = document.querySelector('.datepicker');
var returnDate = new Date();
returnDate.setDate(returnDate.getDate()+30);



var adjustButton = document.querySelector('.adjust-button');
adjustButton.onclick = function(evt){ 
	var dismissButton = adjustButton.animate(
	[
	  {transform:"translate(0,0)", opacity:1},
	  {transform:"translate(0,50px)", opacity:0}
	],300);

	dismissButton.onfinish = function(){
		adjustButton.style.display = "none";
		var datepicker = document.querySelector('.datepicker');
		var returnDate = new Date();
		returnDate.setDate(returnDate.getDate()+30);

		
		var finish = function(evt){
			// var purchaseButton = evt.target;
			// purchaseButton.style.zIndex = 100;
			// purchaseButton.style.transition = "initial";
			// purchaseButton.innerHTML = '';
			// var scaleUp = purchaseButton.animate([
			// 	{transform:"scale(1,1)"},
			// 	{transform:"scale(1.25,15.33)"}
			// 	],400);

			// scaleUp.onfinish=function(){
			// 	purchaseButton.style.position = "absolute";
			// 	// purchaseButton.style.
			// 	purchaseButton.style.top = 0;
			// 	purchaseButton.style.width = "100%";
			// 	purchaseButton.style.height = "100%";
			// 	purchaseButton.style.pointerEvents = "none";
			// 	var reloadButton = document.createElement('div');
			// 	reloadButton.style.width = "80%";
			// 	reloadButton.style.height = "48px"
			// 	reloadButton.style.color = "white";
			// 	reloadButton.innerHTML = "End";
			// 	reloadButton.style.border = "1px solid white";
			// 	reloadButton.style.display = "flex";
			// 	reloadButton.style.alignItems = "center";
			// 	reloadButton.style.justifyContent = "center";
			// 	reloadButton.style.fontSize = "1.8em";
			// 	reloadButton.style.cursor = "pointer";
			// 	reloadButton.style.zIndex = 1000;
			// 	purchaseButton.appendChild(reloadButton);
			// 	setTimeout(function(){window.location.reload();},1000);
				

			//};
			
		};

		ReactDOM.render(<div>
		<div style={{height:"48px",borderTop:"1px solid #eee", borderBottom:"1px solid rgba(0,0,0,0.05)",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
			<div style={{color:"rgba(0,0,0,0.3)", paddingRight:"10px"}}>TRANSFER</div>
			<div>NON-STOP</div>
			<i className="fa fa-sort-desc" aria-hidden="true" style={{position:"relative",top:"-5px",paddingLeft:"10px"}}></i>
		</div>
		<FlyDatePicker leave={"LEAVE"} month={(new Date()).toLocaleString('en-us', {  month: 'long' })} prices = {[359, 469, 299, 329,599, 339, 449]}/>
		<FlyDatePicker leave={"RETURN"} month={returnDate.toLocaleString('en-us', {  month: 'long' })} prices = {[469, 259, 299, 659,459, 339, 569]}/>
		<div className="action-bottom">
			<div id="purchaseButton" onClick = {finish} className="purchase-button button"><i className="fa fa-plane" style={{transform:"rotate(45deg)",color:"white",width:"16px",height:"16px",position: "relative",top:"5px",paddingRight: "10px",pointerEvents:"none"}} aria-hidden="true"></i><span style={{pointerEvents:"none"}}>PURCHASE TICKETS</span></div>
	    	<div id="selectdateButton" className="select-date button"><span>SELECT DATE</span></div>
	    	
	    </div>
		</div>,datepicker);
	};

	var itinerary = document.querySelector('.itinerary');
	var dismissItinerary = itinerary.animate(
	[
	  {transform:"translate(0,0)", opacity:1},
	  {transform:"translate(0,50px)", opacity:0}
	],300);

	dismissItinerary.onfinish = function(){
		itinerary.style.display = "none";
	};
};
