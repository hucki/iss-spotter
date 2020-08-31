import React, {useState, useEffect} from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';
import './App.css';
import ApiClient from './services/ApiService';

function App() {
  const [zoom] = useState(3);
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);


  useEffect(() => {
    const moveIss = () => {
      getIssPosition();
    }
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
