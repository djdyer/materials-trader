const API_KEY = 'AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ'

// const address = document.querySelector('#material-address').value
// console.log("address:", address);

const address = "Atlanta";
console.log('MAP JS CONNECTED')

function mapApiCall() {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('GOOGLE MAP LOCATION DATA', data.results[0].geometry.location)

      let coords = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      }

      myMap(coords);
     
        // new google.maps.Map(document.getElementById('location-map'), {
        //   center: {lat: coords.latitude, lng: coords.longitude},
        //   zoom: 5
        // });
    })
}

mapApiCall()

function myMap(coords) {
  console.log('coords in my Map', coords)
  var mapProp = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 5,
  }
  var map = new google.maps.Map(
    document.getElementById('location-map'),
    mapProp
  )
}
