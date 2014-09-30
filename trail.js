var map;
var marker;
function initialize() {
  var route1Latlng = new google.maps.LatLng(49.279933, -123.109557);
  var mapOptions = {
     center: route1Latlng,
     zoom: 12,
     mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  $.ajax({
   type: "GET",
   url: "Seawall_Race.gpx",
   dataType: "xml",
   success: function (xml){ 
     var start;
     var end;
     var points = [];
     var bounds = new google.maps.LatLngBounds();
     $(xml).find("trkpt").each(function() {
       var lat = $(this).attr("lat");
       var lon = $(this).attr("lon");
       var p = new google.maps.LatLng(lat, lon);
       points.push(p);
       bounds.extend(p);
     });
       var startRoute = function() {
         latStart = $(xml).find("trkpt").first().attr("lat");
         lonStart = $(xml).find("trkpt").first().attr("lat");
         start = new google.maps.LatLng(latStart, lonStart);
       } 
       var endRoute = function(){
        latEnd = $(xml).find("trkpt").last().attr("lat");
        lonEnd = $(xml).find("trkpt").last().attr("lon");
        end = new google.maps.LatLng(latEnd, lonEnd);
        dropEndMarker(end);
       }    
       var poly = new google.maps.Polyline({
       path: points,
       strokeColor: "#F9690E",
       strokeOpacity: .5,
       strokeWeight: 2
     });
     poly.setMap(map);
     map.fitBounds(bounds);
     startRoute();
     endRoute();
   }
 });
 function dropStartMarker(start) {
   var marker = new google.maps.Marker({
    map: map,
    position: start,
    title: "I start my run here, woop!"          
   });
 }
 function dropEndMarker(end) {
   var marker = new google.maps.Marker({
    map: map,
    position: end,
    title: "I end my run here, woop!"          
   });
 }
}
google.maps.event.addDomListener(window, 'load', initialize);
