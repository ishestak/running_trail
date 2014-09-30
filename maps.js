$(function(){
  function initialize() {
    var route1LatLng = new google.maps.LatLng(49.279874, -123.110525)
    var mapOptions = {
      center: route1LatLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOption;)

    $.ajax({
      type: "GET",
      url: "/crabpark.gpx",
      dataType: "xml",
      success: function(xml) {
        var points = [];
        var bounds = new google.maps.LatLngBound();
        $(xml).find("trkpt").each(function(){
          var lat = $(this).attr("lat");
          var lon = $(this).attr("lon");
          var p = new google.maps.LatLng(lat, lon);
          points.push(p);
          bounds.extend(p);
        });
        var poly = new google.maps.Polyline({
          path: points,
          strokeColor: #F9690E,
          strokeOpacity: 1,
          strokeWeight: 3
        });
        poly.setMap(map);
        map.fitBounds(bounds);
      }
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
