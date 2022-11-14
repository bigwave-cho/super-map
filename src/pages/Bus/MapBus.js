import React, { useRef, useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const MapBus = ({ paintMap, coordinate, color, mapBusList, busNo }) => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [curLocation, setCurLocation] = useState(null);
  const { naver } = window;
  const [busCoord, setBusCoord] = useState([]);

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

    const marker = new naver.maps.Marker({
      position: curLocation,
      map,
      icon: {
        url: '/images/marker.png',
        size: new naver.maps.Size(29, 29),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(0, 0),
      },
    });
    setMarker(marker);
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
    setMap(new naver.maps.Map(mapElement.current, mapOptions));
  }, []);

  //실시간 버스 위치 그리기

  const [markerArr, setMarkerArr] = useState([]);
  const [infoWindowArr, setInfoWindowArr] = useState([]);
  useEffect(() => {
    busCoord.map(e => e.setMap(null));
    setBusCoord([]);

    if (paintMap) {
      markerArr.forEach(marker => marker.setMap(null));
      // setMarkerArr([]);

      mapBusList.map(e => {
        const busLocation = new naver.maps.LatLng(e.stationY, e.stationX);

        const infoWindow = new naver.maps.InfoWindow({
          position: busLocation,
          maxWidth: 200,
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#D3D3D3',
          anchorSize: new naver.maps.Size(13, 13),
          anchorSkew: true,
          anchorColor: '#FFFFFF',
          content: [
            '<div class=content>',
            `<h3 style="color: ${color}">${busNo}</h3>`,
            `<span style="font-size: 15px">${e.stationName}</span>`,
            '<div>',
          ].join(''),
        });

        setInfoWindowArr(prev => [...prev, infoWindow]);

        const marker = new naver.maps.Marker({
          map: map,
          position: busLocation,
          _keyInfo: e.plainNo,
          icon: {
            content: [
              `<div class=marker style="transform: rotate(${
                e.directionAngle < 180
                  ? e.directionAngle + 180
                  : e.directionAngle
              }deg);">`,
              `<div class=busNo style="transform: rotate(90deg);">${e.plainNo.slice(
                e.plainNo.length - 4
              )}</div>`,
              '<svg width="23" height="37" viewBox="0 0 23 37" fill="none" xmlns="http://www.w3.org/2000/svg">',
              `<rect x="21.543" y="36.1162" width="21" height="35" rx="3.5" transform="rotate(180 21.543 36.1162)" fill="${color}" stroke="#333333"/>`,
              '<rect x="19.043" y="7.61621" width="16" height="4" rx="2" transform="rotate(180 19.043 7.61621)" fill="white"/>',
              '</svg>',
              '</div>',
            ].join(''),
            anchor: new naver.maps.Point(25, 26),
          },
          clickable: true,
        });
        setMarkerArr(prev => [...prev, marker]);

        naver.maps.Event.addListener(marker, 'click', function (e, index) {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        });
      });
    } else {
      markerArr.forEach(marker => marker.setMap(null));
      infoWindowArr.forEach(infoWindow => infoWindow.setMap(null));
    }
  }, [paintMap, mapBusList]);

  //버스노선 polyline 그리기
  useEffect(() => {
    if (!map) return;

    if (coordinate && color) {
      const coordsArr = [];
      coordinate.map(e => coordsArr.push(new naver.maps.LatLng(e[1], e[0])));

      new naver.maps.Polyline({
        path: coordsArr, //선 위치 변수배열
        strokeColor: color,
        strokeOpacity: 1, //선 투명도 0 ~ 1
        strokeWeight: 5, //선 두께
        strokeLineJoin: 'round',
        strokeStyle: 'solid',
        strokeLineCap: 'round',
        map: map, //오버레이할 지도
        zIndex: 10,
      });

      const bounds = new naver.maps.LatLngBounds();
      for (let i = 0; i < coordsArr.length; i++) {
        bounds.extend(coordsArr[i]);
      }
      map.fitBounds(bounds, 200);
    }
  }, [color, coordinate]);

  //정류장 정보창
  useEffect(() => {
    const coordLat = new URL(window.location.href).searchParams.get('lat');
    const coordLng = new URL(window.location.href).searchParams.get('lng');
    const arsId = new URL(window.location.href).searchParams.get('arsid');
    const stationName = new URL(window.location.href).searchParams.get('name');
    const direction = new URL(window.location.href).searchParams.get(
      'direction'
    );

    if (!map) return;
    if (stationName) {
      const staLocation = new naver.maps.LatLng(coordLat, coordLng);

      var contentString = [
        '<div class=content>',
        `   <h3>${stationName}</h3>`,
        `   <ul><li>${arsId} ㅣ <li><span>${direction ? direction : ''}</span>`,
        '<li>&nbsp;방면</li></ul>',
        '</div>',
      ].join('');

      const infowindow = new naver.maps.InfoWindow({
        position: staLocation,
        content: contentString,
        maxWidth: 240,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        anchorSize: new naver.maps.Size(13, 13),
        anchorSkew: true,
        anchorColor: '#FFFFFF',
        map: map,
      });
      infowindow.open(map);
      map.setCenter(staLocation);
      map.setZoom(18);
    }
  }, [map]);

  return (
    <>
      <MapContent
        ref={mapElement}
        style={{ width: '100%', minHeight: '100vh', position: 'absolute' }}
        id="naverMap"
      />
      <MoveMyLocation onClick={moveToMyLocation}>
        <MyLocationIcon />
      </MoveMyLocation>
    </>
  );
};

const MapContent = styled.div`
  z-index: 0;
  outline: none;

  div.marker {
    position: relative;

    .busNo {
      position: absolute;
      padding: 18px 1px 14px;
      color: #ffffff;
      font-weight: 700;
      font-size: 10px;
    }
  }

  div.content {
    padding: 12px;

    h3 {
      display: block;
      max-width: 210px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      margin-bottom: 4px;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      color: #333333;
    }

    ul {
      display: flex;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #787878;

      span {
        display: block;
        max-width: 137px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
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

export default memo(MapBus);
