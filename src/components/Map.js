import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Map = () => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [curLocation, setCurLocation] = useState(null);
  const { naver } = window;

  const moveToMyLocation = () => {
    const error = () => {
      setCurLocation(new naver.maps.LatLng(37.4959096, 127.0305546));
      alert('정확한 위치를 확인하지 못했습니다.');
    };

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const lat = coords.latitude;
      const lng = coords.longitude;

      setCurLocation(new naver.maps.LatLng(lat, lng));
    }, error);
  };

  useEffect(() => {
    if (!map || !marker || !curLocation) return;

    map.setCenter(curLocation);
    map.setZoom(17, true);
    marker.setPosition(curLocation);
  }, [curLocation, map, marker]);

  // Naver Map
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(37.4959096, 127.0305546);

    const mapOptions = {
      center: location,
      zoom: 11,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    setMap(map);

    const marker = new naver.maps.Marker({
      position: location,
      map,
      icon: {
        url: '/images/marker.png',
        size: new naver.maps.Size(29, 29),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(0, 0),
      },
    });

    setMarker(marker);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <MapContent
        ref={mapElement}
        style={{ width: '100%', minHeight: '100vh' }}
        id="naverMap"
      />
      <MoveMyLocation onClick={moveToMyLocation}>
        <MyLocationIcon />
      </MoveMyLocation>
    </>
  );
};

const MapContent = styled.div`
  position: relative;
  outline: none;
`;

const MoveMyLocation = styled.div`
  position: absolute;
  bottom: 40px;
  right: 12px;
  width: 40px;
  height: 40px;
  padding: 7px;
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.65);
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.4);
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: #60f06b;
    background-color: rgba(255, 255, 255, 0.85);
    transition: 0.2s;
  }
`;

export default Map;
