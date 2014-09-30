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
       var startRoute = function(){
        latStart = $(this).first().attr("lat");
        lonStart = $(this).first().attr("lon");
        var s = new google.maps.LatLng(latStart, lonStart);
         var marker = new google.maps.Marker({
          map:map,
          position: s,
          title: "I start my run here, woop!"          
         });
       console.log(s);
       } 
       var endStart = function(){
        latEnd = $(this).last().attr("lat");
        latEnd = $(this).first().attr("lon");
        var e = new google.maps.LatLng(latEnd, lonEnd);
         var marker = new google.maps.Marker({
          map:map,
          position: e,
          title: "I end my run here, woop!"          
         });
        console.log(e);
       } 
       var p = new google.maps.LatLng(lat, lon);
       points.push(p);
       bounds.extend(p);
     });
     var poly = new google.maps.Polyline({
       path: points,
       strokeColor: "#F9690E",
       strokeOpacity: .5,
       strokeWeight: 2
     });
     poly.setMap(map);
     map.fitBounds(bounds);
   }
 });
}
google.maps.event.addDomListener(window, 'load', initialize);
