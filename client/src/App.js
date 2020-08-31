import React, {useState, useEffect} from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';
import './App.css';
import ApiClient from './services/ApiService';

function App() {
  const [zoom, setZoom] = useState(3);
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);
  const [trail, setTrail] = useState([{lat: 0, lng: 0}]);

  useEffect(() => {
    getIssPosition();
    setInterval(() => moveIss(), 5000)
  }, [])

  const getIssPosition = () => {
    ApiClient.getPosition()
    .then(curPosition => {
      setLat(curPosition.iss_position.latitude);
      setLng(curPosition.iss_position.longitude);
    })
  }
  const moveIss = () => {
    getIssPosition();
  }
  // function moveISS () {
  //   $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
  //       var lat = data['iss_position']['latitude'];
  //       var lon = data['iss_position']['longitude'];

  //       // See leaflet docs for setting up icons and map layers
  //       // The update to the map is done here:
  //       iss.setLatLng([lat, lon]);
  //       isscirc.setLatLng([lat, lon]);
  //       map.panTo([lat, lon], animate=true);
  //   });
  //   setTimeout(moveISS, 5000);
  // }

  const position = [lat, lng];
  return (
    <>
      <Map className='map' center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker className='iss' position={position}></Marker>
      </Map>
    </>
  );
}

export default App;
