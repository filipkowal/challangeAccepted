
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        alert(device.model);
        var mapcanvas = document.createElement('div');
          mapcanvas.id = 'mapcontainer';
          mapcanvas.style.height = '400px';
          mapcanvas.style.width = '600px';

          document.querySelector('article').appendChild(mapcanvas);

          var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              
              var options = {
                zoom: 15,
                center: coords,
                mapTypeControl: false,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

              var marker = new google.maps.Marker({
                  position: coords,
                  map: map,
                  title:"You are here!"
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    getPosition: function() {
        alert('anythin');
    },
};
