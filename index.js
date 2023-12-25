/* 1. my location */
const locationBtn = document.querySelector('#my-location');
const locationDisplay = document.querySelector('#location-display');

locationBtn.addEventListener('click', function () {
  try {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = `${position.coords.latitude}`;
      const lon = `${position.coords.longitude}`;
    });
  } catch (error) {
    locationDisplay.innerHTML = 'Error getting location.';
  }
});
/* 2. search location */

/* 3. display  weather*/
