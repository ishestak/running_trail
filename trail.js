function initialize() {
  var route1Latlng = new google.maps.LatLng(49.279933, -123.109557);
  var mapOptions = {
     center: route1Latlng,
     zoom: 11,
     mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  $.ajax({
   type: "GET",
   url: "crabpark.gpx",
   dataType: "xml",
   success: function (xml){ 
     var points = [];
     var bounds = new google.maps.LatLngBounds();
     $(xml).find("trkpt").each(function () {
       var lat = $(this).attr("lat");
       var lon = $(this).attr("lon");
       var p = new google.maps.LatLng(lat, lon);
       points.push(p);
       bounds.extend(p);
     });
     var poly = new google.maps.Polyline({
       path: points,
       strokeColor: "#FF00AA",
       strokeOpacity: .7,
       strokeWeight: 4
     });
     poly.setMap(map);
     map.fitBounds(bounds);
   }
 });
}
google.maps.event.addDomListener(window, 'load', initialize);
