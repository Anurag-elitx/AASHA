let recorder, map, infoWindow;

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
  const userEmail = prompt("Enter your email", " ");

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

const recordButton = document.getElementById('startRecordingBtn');

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript.toLowerCase();

  if (transcript.includes('help')) {
    startRecording();
    sendEmergencyEmail();
    sendLiveLocation();
  }
};

// Start voice recognition and fall analysis automatically when the page loads
recognition.start();
window.addEventListener('devicemotion', handleMotion);

function handleMotion(event) {
  const acceleration = event.accelerationIncludingGravity;
  const accelerationMagnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);

  // Adjust the fall threshold based on testing
  const fallThreshold = 50;

  if (accelerationMagnitude > fallThreshold) {
    initiateFallAlert();
  }
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function (stream) {
      recorder = RecordRTC(stream, { type: 'video' });

      // Start recording for 1 minute
      recorder.startRecording();
      setTimeout(stopRecording, 60000);
    })
    .catch(function (error) {
      console.error('Error accessing camera and microphone:', error);
    });
}

function stopRecording() {

  recorder.stopRecording(function (videoURL) {
    // Display the recorded video on the webpage
    const videoElement = document.createElement('video');
    videoElement.src = videoURL;
    videoElement.controls = true;
    document.body.appendChild(videoElement);

    // Provide a download link for the user to save the video manually
    const downloadLink = document.createElement('a');
    downloadLink.href = videoURL;
    downloadLink.download = 'recorded_video.webm';
    downloadLink.textContent = 'Download Video';
    document.body.appendChild(downloadLink);
    alert('video proof recorded !!');
    downloadLink.click();
  });
}



function initiateFallAlert() {
  // Your code to handle a fall alert goes here
  alert('Fall detected! Initiating fall alert.');
}

function sendEmergencyEmail() {
  const EMAILJS_PUBLIC_KEY = 'IuV_lWzTUPfkTmdol';  // Replace with your actual Email.js public key
  const EMAILJS_SERVICE_ID = 'service_z7kfwpv';  // Replace with your actual Email.js service ID
  const EMAILJS_TEMPLATE_ID = 'template_9lkri2t';  // Replace with your actual Email.js template ID
  const authoritiesEmail = 'aliyasharma.1207@gmail.com';  // Replace with the actual authorities' email address

  emailjs.init(EMAILJS_PUBLIC_KEY);

  const templateParams = {
    message: 'Emergency: Help Requested',
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then((response) => {
      console.log('Emergency email sent successfully:', response);
      alert('Emergency email sent successfully !');
    })
    .catch((error) => {
      console.error('Error sending emergency email:', error);
    });
}

function sendLiveLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Send the live location data to your server or perform necessary actions
          console.log("Live Latitude: " + latitude + " Longitude: " + longitude);
      }, function (error) {
          console.error('Error getting live location:', error);
      });
  } else {
      console.error("Geolocation is not supported by this browser.");
  }
}

