// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
   
  
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

const emailButton = document.getElementById("emailButton");
emailButton.addEventListener("click", () => {
  const userEmail = prompt("Enter your email"," ");

  if (userEmail) {
    sendLocationByEmail(userEmail);
  }
});


function sendLocationByEmail(email) {
const location = {
  lat: infoWindow.getPosition().lat(),
  lng: infoWindow.getPosition().lng(),
};

// Use Email.js API for sending email, replace with your actual Email.js template and user ID
emailjs.send("service_z7kfwpv", "template_9lkri2t", {
    to_email: email,
    location: `Latitude: ${location.lat}, Longitude: ${location.lng}`,
  })
    .then((response) => {
      console.log('Email sent:', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
  
}

window.initMap = initMap;


