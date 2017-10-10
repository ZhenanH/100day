

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VvZXIyMyIsImEiOiJpYmU5MFp3In0.lm0nc3EaP-b1S6bWFFtjmg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/guoer23/cj86c7z3s18bt2slg7ga3de0y', // stylesheet location
    center: [-73.981024,40.760332], // starting position [lng, lat]
    zoom: 11.5 // starting zoom,

});
console.log(map);
console.log("map");

map.on('load', function () {
	//console.log(map.getStyle());
	console.log("map loaded");
	document.querySelector("#loading").style.opacity = 0;
	geoJSON.then(function(data){
		
		map.addSource("taxi",{
                    'type': 'geojson',
                    'data':dataByTime(12,data)        
                });

          map.addLayer({
                      "id": "taxi",
                      "type": "circle",
                      "source": "taxi",
                      "paint": {
                          'circle-radius': {
				                'base': 1.85,
				                'stops': [[12, 1], [22, 100]]
				            },
                          "circle-opacity":0.6,
                          "circle-stroke-width":0,
                          "circle-color": {
                          	"property":"time",
                          	"stops":[[0,"#352cb7"],[12,"#ab2cb7"],[24,"#352cb7"]]
                          }
                          }
                        
                      });

          
          window.onresize = resize;

          function resize(){
 
          	if(window.innerWidth>=600){
        
          	setTimeout(function(){map.getSource('taxi').setData(data);},1000);
          }else{
          
          	setTimeout(function(){map.getSource('taxi').setData(dataByTime(12,data));},1000);
          }

           

          };

          resize();
          

  //         function dayNightAnimate(t){
		// 	     //console.log(computedOpacity(t));
		// 	    //console.log(dataByTime(17,data).features);
		// 	    var hour = Math.round(0.5*(Math.sin(t/1000)+1)*24);
 	// 			map.getSource('taxi').setData(dataByTime(hour,data));
			    
 				
			    
		// 	    //console.log(hour);
		// 	    requestAnimationFrame(dayNightAnimate);
		// 	}

		
		// dayNightAnimate(0)
                     
                 
	});

	


});

function dataByTime(t, data){
	var newData = Object.assign({},data);
	newData.features = data.features.slice().filter(function(e){ return e.properties.time === t});
	return newData;
}

var taxiPromise = fetch('./taxitime.json').then(function(res){
	return res.json();
});


var geoJSON = taxiPromise.then(function(data){

	var geo = { "type": "FeatureCollection",
    "features": []
     };

	data.forEach(function(e){
		geo.features.push({ "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [e.lng, e.lat]},
        "properties":{"time": e.time }
        });
	});
    
	return geo;
});





