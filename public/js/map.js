const { Loader } = require("@googlemaps/js-api-loader");

const API_KEY = "AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ";

const address = document.getElementById("location").innerHTML;
console.log("address:", address);

// const address = "Atlanta";
// console.log('MAP JS CONNECTED')

function mapApiCall() {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(
        "GOOGLE MAP LOCATION DATA",
        data.results[0].geometry.location
      );

      let coords = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      };

      // myMap(coords);
      // var map;

      const loader = new Loader({
        apiKey: "AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ",
        version: "weekly",
      });

      loader.load().then(() => {
        map = new google.maps.Map(document.getElementById("location-map"), {
          center: { lat: coords.lat, lng: coords.lng },
          zoom: 10,
        });
      });

      // function myMap(coords) {
      //   console.log('coords in my Map', coords)
      //   // }
      //   map = new google.maps.Map(
      //     document.getElementById('location-map'),
      //     {
      //       center: new google.maps.LatLng(coords.lat, coords.lng),
      //       zoom: 10
      //     }
      //   )
      // }
    });
}

// new google.maps.Map(document.getElementById('location-map'), {
//   center: {lat: coords.latitude, lng: coords.longitude},
//   zoom: 5
// });

mapApiCall();
