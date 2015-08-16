/* Base JS for mapping POI and route shortest distance route.
 *
 * Hack the Planet project by Team Hotdog.
 */

var firstReport = true;

var audio = document.getElementById("player");
audio.addEventListener("ended", function() {
    speaking = false;
    speakNext();
});

// ffwdme initialization.
ffwdme.initialize({
  routing: 'GraphHopper',
  graphHopper: {
    apiKey: '8a72901b-f362-4ebb-898a-cf2f73f9f249'
  }
});

/*
 * ffwdme geoposition event handlers.
 */
ffwdme.on('geoposition:init', function() {
  speak("Finding geolocation.");
});

ffwdme.on('geoposition:ready', function() {
  console.log("current position: ",
    ffwdme.geolocation.last.geoposition.coords.latitude, ",",
    ffwdme.geolocation.last.geoposition.coords.longitude);
  speak("Geolocation ready.");
  startNavigation();
});

ffwdme.on('geoposition:update', function() {
  console.log("current position update: ",
    ffwdme.geolocation.last.geoposition.coords.latitude, ",",
    ffwdme.geolocation.last.geoposition.coords.longitude);
});

/*
 * ffwdme route calculation event handlers.
 */
ffwdme.on('routecalculation:start', function() {
  speak("Starting navigation.");
});

ffwdme.on('routecalculation:success', function(response) {
  speak("Found route.");
  ffwdme.navigation.setRoute(response.route).start();
});

ffwdme.on('routecalculation:error', function() {
  console.log('navigation ran into error');
});

/*
 * ffwdme navigation event handlers.
 */
ffwdme.once('navigation:onroute', function(e) {
  var navInfo = e.navInfo;
  var eta = convertSecToMin(navInfo.timeToDestination);
  speak("Estimated time of arrival is " + eta + " minutes.");
});

ffwdme.on('navigation:onroute', function(e) {
  var navInfo = e.navInfo;

  // If I'm arriving the next step, speak it to me.
  if (navInfo.distanceToDestination <= 500) {
    speak(navInfo.nextDirection.instruction);
  }
  // and again, if I'm closer.
  if (navInfo.distanceToDestination <= 250) {
    speak(navInfo.nextDirection.instruction);
  }

  // Have I arrived yet?
  if (navInfo.arrived) {
    if (places.length != 0) {
      var nextDestination = places.pop();
      new ffwdme.routingService({
        dest: { lat: nextDestination.lat, lng: nextDestination.lng }
      }).fetch();
      speak("Routing to new destination, " + nextDestination.name);
    } else {
      speak("Reached end of route playlist. Go home?");
    }
  }
});

ffwdme.on('navigation:offroute', function() {
  speak("You have left the route.");
});

/*
 * ffwdme reroute calculation event handlers.
 */
ffwdme.on('reroutecalculation:success', function() {
  speak("Rerouting.");
});

/*
 * Start navigating.
 */
function startNavigation() {
  var firstDestination = places.pop();
  speak("Routing to " + firstDestination.name);
  new ffwdme.routingService({
    dest: { lat: firstDestination.lat, lng: firstDestination.lng }
    }).fetch();
}

/*
 * Speaks text. :D
 * @param string Text to speak.
 */

var speakQueue = [];
var speaking = false;
function speak(text) {
  speakQueue.push(text);
  speakNext();
}

function speakNext() {
  if (!speakQueue.length || speaking)
    return;
  var text = speakQueue.shift();
  console.log(text);
  speaking = true;
  var audio = document.getElementById("player");
  audio.src = "http://tts-api.com/tts.mp3?q=" + escape(text);
  audio.play();
}

function convertSecToMin(seconds) {
  return seconds / 60;
}

var places = [
  {
    name: "Googleplex",
    lat: 37.4184,
    lng: -122.0880,
    adventure: 0,
    relax: 8,
    duration: 5
  },
  {
    name: "Baylands Nature Reserve",
    lat: 37.2412414241,
    lng: -122.1064,
    adventure: 0,
    relax: 1,
    duration: 15
  },
  {
    name: "Computer History Museum",
    lat: 37.4144,
    lng: -122.0768,
    adventure: 0,
    relax: 6,
    duration: 5
  }, {
      name: "Baylands Nature Reserve",
      lat: 37.2412414241,
      lng: -122.1064,
      adventure: 0,
      relax: 1,
      duration: 15
    }];

var time = 0;

function timeTick() {
    var hours = Math.floor(time / 60);
    var mins = time % 60;
    if (mins < 0)
      mins = '0' + mins;
    for (var k of document.querySelectorAll(".atimer")) {
      k.innerHTML = (hours + ":" + mins);
    }
    time++;
    setTimeout(timeTick, 1000);
}

timeTick();
