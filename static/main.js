function queryCar()
{
	//關閉 Go按鈕，防止用戶多次按下
	document.getElementById("queryCar").disabled = true; 
	//顯示"載入中..."的文字
	document.getElementById("loading").style.display = 'block';
	//顯示目前處理進度文字
	document.getElementById("process").style.display = 'block'; 

	//復歸進度條寬度
	document.getElementById("processStatus").style.width = "0%" 
	//顯示目前處理進度文字
	document.getElementById("process").innerText="";
	$.get("fetchAllMotor",
		function (data) {
			document.getElementById("queryCar").disabled = false
			//關閉"載入中..."的文字
			document.getElementById("loading").style.display = 'none';
			navigator.geolocation.getCurrentPosition((position)=>showPosition(position,data));

		}
	);
}

  
function markerAppend(markers,motors,baseMap)
{
	icons={
		"iRent" : "/static/irentIcon.png",
		"iRentCar" : "/static/irentCarIcon.png",
		"wemo" : "/static/wemoIcon.png",
		"GoShare" : "/static/GoShareIcon.png",
	}
	
	
	motors["data"].forEach(function (motor) {
		point = { lat: motor['lat'], lng: motor['lng'] };
		var marker = new google.maps.Marker({
			position: point,
			map : baseMap,
			icon: icons[motors['name']],
		});

		var infoWindow = new google.maps.InfoWindow({
			position: { lat: motor['lat'], lng: motor['lng']},
			content: motors['name'] + "\n" + motor['CarNo']
		});

		marker.addListener('click', function () {
			if (prev_infoWindow) {
				prev_infoWindow.close();
			}

			prev_infoWindow = infoWindow;
			infoWindow.open(map, marker);
		});
		markers.push(marker);
	});
	return markers
}
var markers = []; 
var infoWindows = [];
var map;
var marker;
var prev_infoWindow =false; 
function setMarkers(motors) {

	for (var i = 0; i< markers.length; i++) {
		markers[i].setMap(null);
	}
	iRentMarkers = [];
	wemoMarkers = [];
	GoShareMarkers = [];
	
	iRent_motors = motors[0];
	iRentCar = motors[1];
	wemo_motors = motors[2];
	GoShare_motors = motors[3];
	var mapOptions = {
		zoom: 16,
		center: {lat:location.lat,lng:location.lng},
		zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			mapTypeId: 'roadmap',
			// styles:[],
					  
	}

	baseMap = new google.maps.Map(document.getElementById("map"), mapOptions);
	markers=[]

	//將三個平台的marker畫上去
	markers = markerAppend(markers,iRent_motors,baseMap)
	markers = markerAppend(markers,iRentCar,baseMap)
	markers = markerAppend(markers,wemo_motors,baseMap)
	markers = markerAppend(markers,GoShare_motors,baseMap)
		


}


function googleMapShow()
{
	const googleMap = new Vue({
	  el: '#app',
	  data: {
		map: null
	  },
	  methods: {
		// init google map
		initMap() {

			var location = {
				lat: 25.0374865, // 經度
				lng: 121.5647688 // 緯度
			};
		  
		  // 建立地圖
		  this.map = new google.maps.Map(document.getElementById('map'), {
			center: location, // 中心點座標
			zoom: 16, // 1-20，數字愈大，地圖愈細：1是世界地圖，20就會到街道
			/*
			  roadmap 顯示默認道路地圖視圖。
			  satellite 顯示 Google 地球衛星圖像。
			  hybrid 顯示正常和衛星視圖的混合。
			  terrain 顯示基於地形信息的物理地圖。
			*/
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			mapTypeId: 'roadmap',
			styles:[
					//   {
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"color": "#242f3e"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#746855"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"elementType": "labels.text.stroke",
					// 	"stylers": [
					// 	  {
					// 		"color": "#242f3e"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "administrative",
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"visibility": "off"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "administrative.locality",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#d59563"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "poi",
					// 	"stylers": [
					// 	  {
					// 		"visibility": "off"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "poi",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#d59563"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "poi.park",
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"color": "#263c3f"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "poi.park",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#6b9a76"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road",
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"color": "#38414e"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road",
					// 	"elementType": "geometry.stroke",
					// 	"stylers": [
					// 	  {
					// 		"color": "#212a37"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road",
					// 	"elementType": "labels.icon",
					// 	"stylers": [
					// 	  {
					// 		"visibility": "off"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#9ca5b3"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road.highway",
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"color": "#746855"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road.highway",
					// 	"elementType": "geometry.stroke",
					// 	"stylers": [
					// 	  {
					// 		"color": "#1f2835"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "road.highway",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#f3d19c"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "transit",
					// 	"stylers": [
					// 	  {
					// 		"visibility": "off"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "transit",
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"color": "#2f3948"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "transit.station",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#d59563"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "water",
					// 	"elementType": "geometry",
					// 	"stylers": [
					// 	  {
					// 		"color": "#17263c"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "water",
					// 	"elementType": "labels.text.fill",
					// 	"stylers": [
					// 	  {
					// 		"color": "#515c6d"
					// 	  }
					// 	]
					//   },
					//   {
					// 	"featureType": "water",
					// 	"elementType": "labels.text.stroke",
					// 	"stylers": [
					// 	  {
					// 		"color": "#17263c"
					// 	  }
					// 	]
					//   }
					]
			  });
			  	
		}
	  },
	  created() {
		window.addEventListener('load', () => {
		  this.initMap();
		});
	  }
	});

}

function showPosition(position,data) {
	location.lat = position.coords.latitude;
	location.lng = position.coords.longitude;
	setMarkers(data);

  }

$(document).ready(function(){
	var location = {
		lat: 25.0374865, // 經度
		lng: 121.5647688 // 緯度
	};
	document.getElementById("processBar").style.display = "none";
	document.getElementById("queryCar").addEventListener("click", queryCar);
	
	googleMapShow();
	
	// socket = io.connect();
	socket = io();
	var serverMsg = ""

	//處理Server回傳的訊息
	socket.on('server_response', function (msg) {
		serverMsg = msg["data"]
		status = msg["status"]
		console.log(serverMsg);
		document.getElementById("processBar").style.display = "block";
		if (serverMsg != undefined)
		{
			//顯示目前處理進度文字
			document.getElementById("process").innerText = serverMsg;
			document.getElementById("processStatus").style.width = status + "%";
		}
	});
	//發送一個訊息給server
	socket.on('connect', function() {
        socket.emit('Client_event', {data: 'I\'m connected!'});
    });
	
});
