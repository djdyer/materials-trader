// require('dotenv').config()

const API_KEY = 'AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ'

console.log('MAP JS CONNECTED')

function mapApiCall() {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=2400 River Place Xing, Douglasville, GA 30135&key=${API_KEY}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('GOOGLE MAP LOCATION DATA', data.results[0].geometry.location)

      let coords = {
        lat: data.results[0].geometry.location.lat,
        lon: data.results[0].geometry.location.lng,
      }

      myMap(coords)
    })
}

mapApiCall()

function myMap(coords) {
  console.log('coords in my Map', coords)
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.12085),
    zoom: 5,
  }
  var map = new google.maps.Map(
    document.getElementById('#location-map'),
    mapProp,
  )
}
