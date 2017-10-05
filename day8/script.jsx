


var tracks = [
	{
		albumCover:"./album1.jpeg",
		artist:"Adele",
		song:"Set Fire to the Rain"
	},
	{
		albumCover:"./album2.jpeg",
		artist:"林俊杰",
		song:"不为谁而作的歌"
	},{
		albumCover:"./album3.jpeg",
		artist:"Taylor Swift",
		song:"Look What You Made Me Do"
	},{
		albumCover:"./album4.jpeg",
		artist:"Jason Mraz",
		song:"I'm yours"
	},
	{
		albumCover:"./album5.jpeg",
		artist:"Bruno Mars",
		song:"Lazy Song"
	},{
		albumCover:"./album6.jpeg",
		artist:"Jay Chou",
		song:"夜曲"
	},{
		albumCover:"./album7.jpeg",
		artist:"Adele",
		song:"First Love"
	},{
		albumCover:"./album8.jpeg",
		artist:"Lady Gaga",
		song:"Just Dance"
	}
];


function Track(albumCover,artist,song){

	var track = document.createElement("div");
	track.classList = "track";
	var img = document.createElement("img");
	img.setAttribute("src", albumCover);
	var trackBody = document.createElement("div");
	trackBody.classList = "trackBody"
	trackBody.innerHTML = "<h2>"+song+"</h2><div>"+artist+"</div>";
	var action = document.createElement("div");
	action.classList = "action";
	action.innerHTML = '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>';
	
	var actions = document.createElement("div");
	actions.classList = "actions";

    
	track.appendChild(img);
	track.appendChild(trackBody);
	track.appendChild(action);
	track.appendChild(actions);
	var dispersingButton;

	var controls = document.createElement("div");
    controls.classList = 'controls';
	controls.innerHTML = `
		<i class="fa fa-heart-o" aria-hidden="true"></i>
		<i class="fa fa-comment-o" aria-hidden="true"></i>
		<i class="fa fa-share-alt" aria-hidden="true"></i>
		<i class="fa fa-times" aria-hidden="true"></i>`

	ReactDOM.render(<DispersingButton style={{minHeight:"100%",backgroundColor:"#333"}} ref = {(e) =>{dispersingButton = e; }}/>,actions);
    actions.appendChild(controls);
	action.querySelector("i").addEventListener('click',function(){ return toggleActionsMenu(action,dispersingButton);});
	controls.querySelector(".fa-times").addEventListener('click',function(){return dispersingButton.startAnimation();});

	return track;
}



function toggleActionsMenu(target,dispersingButton){


	var target = target.parentNode.querySelector(".actions");

	if(target.style.minHeight === "64px"){
		target.style.minHeight = "0px";
		target.querySelector(".controls").style.display = "none";
		//target.style.backgroundColor = "#eee";
	}else{
		target.style.minHeight = "64px";
		target.querySelector(".controls").style.display = "flex";
		//target.style.backgroundColor = "black";
	}
}


for(var i=0;i<tracks.length;i++){
	document.querySelector(".list").appendChild(new Track(tracks[i].albumCover,tracks[i].artist,tracks[i].song));
}

document.querySelector(".fa-pause").addEventListener('click',togglePlay);


function togglePlay(evt){
	var target = evt.target.parentNode.parentNode.querySelector('img');
	if(target.style.animationPlayState === "paused"){
		target.style.animationPlayState = "running";
		evt.target.classList = "fa fa-pause";
	}else{
		target.style.animationPlayState = "paused";
		evt.target.classList = "fa fa-play";
	}
}

document.querySelectorAll("i").forEach(i=>{i.addEventListener('click',function(){ 
	    console.log(i.classList);
	    i.style.opacity = 1;
	    i.classList.toggle('active');
		setTimeout(function(){ i.classList.toggle('active');},300);

	});
});








