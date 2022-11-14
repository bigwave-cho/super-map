import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { transportationColor, subwayName } from './typeAttributes.js';

const Map = ({
  searchValue,
  setDetailPath,
  detailPath,
  setSearchValue,
  PathData,
  setPathData,
  getRoutes,
}) => {
  const { naver } = window;
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [curLocation, setCurLocation] = useState(null);
  const [depMarkers, setDepMarkers] = useState([]);
  const [arrMarkers, setArrMarkers] = useState([]);

  const [polyline, setPolyline] = useState([]);
  const [polyMarker, setPolyMarker] = useState([]);

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

    if (!map) {
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
    }
    //eslint-disable-next-line
  }, [detailPath, PathData]);

  //polyline 그리기

  useEffect(() => {
    polyline.map(e => {
      e.setMap(null);
      return null;
    });
    setPolyline([]);

    polyMarker.map(e => {
      e.setMap(null);
      return null;
    });
    setPolyMarker([]);

    if (
      detailPath !== null &&
      searchValue.arrLat.length !== 0 &&
      searchValue.depLat.length !== 0
    ) {
      // 좌표 경계 이동
      const fitCoords = [];

      detailPath.map(ele => {
        const coordsArr = [];
        ele.type === 'walk'
          ? ele.routeList.features.map(e => {
              fitCoords.push(
                new naver.maps.LatLng(
                  e.geometry.coordinates[1],
                  e.geometry.coordinates[0]
                )
              );

              coordsArr.push(
                new naver.maps.LatLng(
                  e.geometry.coordinates[1],
                  e.geometry.coordinates[0]
                )
              );
              return null;
            })
          : ele.routeList.features[1].geometry.coordinates.map(e => {
              coordsArr.push(new naver.maps.LatLng(e[1], e[0]));
              return null;
            });

        setPolyline(prev => [
          ...prev,
          new naver.maps.Polyline({
            path: coordsArr, //선 위치 변수배열
            strokeColor: transportationColor(ele),
            strokeOpacity: 1, //선 투명도 0 ~ 1
            strokeWeight: 5, //선 두께
            strokeLineJoin: 'round',
            strokeStyle: ele.type === 'walk' ? 'shortdot' : 'solid',
            strokeLineCap: 'round',
            map: map, //오버레이할 지도
            zIndex: 10,
          }),
        ]);

        const bounds = new naver.maps.LatLngBounds();

        for (let i = 0; i < fitCoords.length; i++) {
          bounds.extend(fitCoords[i]);
        }

        map.fitBounds(bounds, {
          top: 270,
          right: 270,
          bottom: 270,
          left: 500,
          // maxZoom: 10,
        });

        ele.type !== 'walk' &&
          setPolyMarker(prev => [
            ...prev,
            new naver.maps.Marker({
              position: coordsArr[0], //첫 좌표에 마커 찍기!
              map: map,
              icon:
                ele.type === 'bus'
                  ? {
                      content: [
                        `<div class='hi'><div></div><div class='trans-info'>`,
                        `<svg width="19" height="19" viewBox="0 0 19 19" fill=${transportationColor(
                          ele
                        )} xmlns="http://www.w3.org/2000/svg">

    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.4968 6.29106V6.18724C15.4968 4.11485 13.7803 2.43286 11.6655 2.43286H6.3382C4.22339 2.43286 2.50695 4.11485 2.50695 6.18724V6.29106C2.50528 6.29106 2.50362 6.29107 2.50195 6.29108V8.83272C2.50362 8.83274 2.50528 8.83274 2.50695 8.83274V14.5308C2.50695 14.8755 2.79514 15.1579 3.14691 15.1579H3.84196V15.8431C3.84196 16.1671 4.10896 16.4329 4.44377 16.4329H5.18967C5.52025 16.4329 5.79148 16.1712 5.79148 15.8431V15.1579H12.2504V15.8431C12.2504 16.1671 12.5174 16.4329 12.8522 16.4329H13.5981C13.9287 16.4329 14.1999 16.1712 14.1999 15.8431V15.1579H14.861C15.2128 15.1579 15.501 14.8796 15.501 14.5308V8.8369H15.5011V6.29108L15.4968 6.29106ZM7.05444 3.74523H10.9493C11.3095 3.74523 11.5977 4.03179 11.5977 4.38065C11.5977 4.73366 11.3053 5.01607 10.9493 5.01607H7.05444C6.6942 5.01607 6.40601 4.72951 6.40601 4.38065C6.40601 4.02764 6.6942 3.74523 7.05444 3.74523ZM4.72772 13.9286C4.21915 13.9286 3.80381 13.5257 3.80381 13.0232C3.80381 12.5248 4.21491 12.1178 4.72772 12.1178C5.24053 12.1178 5.65163 12.5207 5.65163 13.0232C5.65163 13.5216 5.23629 13.9286 4.72772 13.9286ZM3.80805 9.43494V7.52868C3.80805 6.9431 4.2912 6.46965 4.88877 6.46965H13.0895C13.6871 6.46965 14.1702 6.9431 14.1702 7.52868V9.43494C14.1702 10.332 11.8477 11.0546 8.98702 11.0546C6.1263 11.0546 3.80805 10.3278 3.80805 9.43494ZM13.276 13.9286C12.7674 13.9286 12.3521 13.5257 12.3521 13.0232C12.3521 12.5248 12.7632 12.1178 13.276 12.1178C13.7888 12.1178 14.1999 12.5207 14.1999 13.0232C14.1999 13.5216 13.7846 13.9286 13.276 13.9286Z"
    />
  
}
</svg>`,
                        `<span>${
                          ele.type === 'bus'
                            ? ele.busNo + '번'
                            : ele.lineId + '호선'
                        }</span></div></div>`,
                      ].join(''),
                      size: new naver.maps.Size(22, 35),
                      anchor: new naver.maps.Point(11, 35),
                    }
                  : {
                      content: [
                        `<div class='hi'><div></div><div class='trans-info'>`,
                        `<svg width="20" height="20" viewBox="0 0 19 19" fill=${transportationColor(
                          ele
                        )} xmlns="http://www.w3.org/2000/svg">

    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.05683 1.55554C3.71431 1.55554 2.62598 2.64387 2.62598 3.9864V9.807C2.62598 10.1426 2.89806 10.4147 3.23369 10.4147H12.1294C12.465 10.4147 12.7371 10.1426 12.7371 9.807V3.9864C12.7371 2.64387 11.6488 1.55554 10.3062 1.55554H5.05683ZM3.89142 3.29901C3.72361 3.29901 3.58757 3.43505 3.58757 3.60287V6.11313C3.58757 6.28095 3.72361 6.41699 3.89142 6.41699H11.4743C11.6421 6.41699 11.7782 6.28095 11.7782 6.11313V3.60287C11.7782 3.43505 11.6421 3.29901 11.4743 3.29901H3.89142ZM4.9712 8.49897C4.9712 8.87567 4.66147 9.18103 4.27938 9.18103C3.8973 9.18103 3.58757 8.87567 3.58757 8.49897C3.58757 8.12228 3.8973 7.81691 4.27938 7.81691C4.66147 7.81691 4.9712 8.12228 4.9712 8.49897ZM11.0834 9.18103C11.4655 9.18103 11.7752 8.87567 11.7752 8.49897C11.7752 8.12228 11.4655 7.81691 11.0834 7.81691C10.7013 7.81691 10.3916 8.12228 10.3916 8.49897C10.3916 8.87567 10.7013 9.18103 11.0834 9.18103Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.40527 12.4441L4.67794 10.7908H6.09163L6.0912 10.7913H9.34396L9.34353 10.7908H10.7572L12.0299 12.4441H10.6162L9.97842 11.6156H5.45674L4.81896 12.4441H3.40527Z"/>
  
}
</svg>`,
                        `<span>${
                          ele.type === 'bus'
                            ? ele.busNo + '번'
                            : ele.type === 'subway' && ele.lineId <= 10
                            ? ele.lineId + '호선'
                            : ele.type === 'subway' && ele.lineId > 10
                            ? subwayName(ele.lineId)
                            : null
                        }</span></div></div>`,
                      ].join(''),
                      size: new naver.maps.Size(22, 35),
                      anchor: new naver.maps.Point(11, 35),
                    },
            }),
          ]);
        return null;
      });
    }
    //eslint-disable-next-line
  }, [detailPath, searchValue.depLat, searchValue.arrLat]);

  //출도착 마커 기능
  useEffect(() => {
    const depPosition = new naver.maps.LatLng(
      searchValue.depLat,
      searchValue.depLng
    );

    const arrPosition = new naver.maps.LatLng(
      searchValue.arrLat,
      searchValue.arrLng
    );

    if (searchValue.depLat) {
      setDepMarkers([
        new naver.maps.Marker({
          position: depPosition,
          map: map,
          draggable: true,
          zIndex: 10,
          icon: {
            url: '/images/pathfinder/depVector.svg',
            size: new naver.maps.Size(25, 34),
            scaledSize: new naver.maps.Size(25, 34),
          },
        }),
      ]);

      depMarkers.map(e => {
        e.setMap(null);
        return null;
      });

      depMarkers.map((e, i) => {
        depMarkers.length === i && e.setMap(map);
        return null;
      });

      map.panTo(depPosition);
    } else {
      depMarkers.map(ele => {
        ele.setMap(null);
        return null;
      });
    }

    if (searchValue.arrLng) {
      setArrMarkers([
        new naver.maps.Marker({
          position: arrPosition,
          map: map,
          draggable: true,
          icon: {
            url: '/images/pathfinder/arrVector.svg',
            size: new naver.maps.Size(25, 34),
            scaledSize: new naver.maps.Size(25, 34),
          },
        }),
      ]);

      arrMarkers.map(e => {
        e.setMap(null);
        return null;
      });

      arrMarkers.map((e, i) => {
        arrMarkers.length === i && e.setMap(map);
        return null;
      });
    } else {
      arrMarkers.map(ele => {
        ele.setMap(null);
        return null;
      });
    }

    if (searchValue.depLat && searchValue.arrLat) {
      getRoutes();
    }
    //eslint-disable-next-line
  }, [searchValue.depLat, searchValue.arrLat]);

  // 마커끝

  useEffect(() => {
    depMarkers.length >= 1 &&
      naver.maps.Event.addListener(depMarkers[0], 'dragend', async function () {
        setDetailPath(null);
        setPathData([]);
        const depCoord = depMarkers[0].getPosition();
        const response = await fetch(
          `/poi/geocoding?lng=${depCoord['_lng']}&lat=${depCoord['_lat']}`
        );
        const data = await response.json();

        setSearchValue(prev => ({
          ...prev,
          departure: data.data?.address,
          depLat: depCoord['_lat'],
          depLng: depCoord['_lng'],
        }));
      });

    arrMarkers.length >= 1 &&
      naver.maps.Event.addListener(arrMarkers[0], 'dragend', async function () {
        setDetailPath(null);
        setPathData([]);
        const arrCoord = arrMarkers[0].getPosition();
        const response = await fetch(
          `/poi/geocoding?lng=${arrCoord['_lng']}&lat=${arrCoord['_lat']}`
        );
        const data = await response.json();

        setSearchValue(prev => ({
          ...prev,
          arrival: data.data?.address,
          arrLat: arrCoord['_lat'],
          arrLng: arrCoord['_lng'],
        }));
      });
    //eslint-disable-next-line
  }, [depMarkers, arrMarkers]);

  // =========== 지도에서 출 도착 마커 찍기

  const openSelectWindow = () => {
    const depMarker = [];
    const arrMarker = [];

    naver.maps.Event.addListener(map, 'rightclick', function (e) {
      const latlng = e.latlng;

      depMarker.map((ele, i) => {
        ele.setMap(null);
        return null;
      });

      arrMarker.map((ele, i) => {
        ele.setMap(null);
        return null;
      });

      depMarker.length === 0 &&
        depMarker.push(
          new naver.maps.Marker({
            position: latlng,
            map: map,
            icon: {
              content: [`<div class='mapMarkers'>출발</div>`].join(''),
              size: new naver.maps.Size(25, 34),
              scaledSize: new naver.maps.Size(25, 34),
              anchor: new naver.maps.Point(50, 50),
            },
          })
        );

      arrMarker.length === 0 &&
        arrMarker.push(
          new naver.maps.Marker({
            position: latlng,
            map: map,
            icon: {
              content: [`<div class='mapMarkers'>도착</div>`].join(''),
              size: new naver.maps.Size(25, 34),
              scaledSize: new naver.maps.Size(25, 34),
              anchor: new naver.maps.Point(2, 50),
            },
          })
        );

      naver.maps.Event.addListener(depMarker[0], 'click', function (e) {
        setDetailPath(null);

        setPathData([]);

        depMarker.map((ele, i) => {
          ele.setMap(null);
          return null;
        });

        arrMarker.map((ele, i) => {
          ele.setMap(null);
          return null;
        });

        fetch(`/poi/geocoding?lng=${latlng['_lng']}&lat=${latlng['_lat']}`)
          .then(res => res.json())
          .then(data => {
            setSearchValue(prev => ({
              ...prev,
              departure: data.data?.address,
              depLat: latlng['_lat'],
              depLng: latlng['_lng'],
            }));
          });
      });

      naver.maps.Event.addListener(arrMarker[0], 'click', function (e) {
        setDetailPath(null);
        setPathData([]);

        depMarker.map((ele, i) => {
          ele.setMap(null);
          return null;
        });

        arrMarker.map((ele, i) => {
          ele.setMap(null);
          return null;
        });

        fetch(`/poi/geocoding?lng=${latlng['_lng']}&lat=${latlng['_lat']}`)
          .then(res => res.json())
          .then(data => {
            setSearchValue(prev => ({
              ...prev,
              arrival: data.data?.address,
              arrLat: latlng['_lat'],
              arrLng: latlng['_lng'],
            }));
          });
      });
    });

    naver.maps.Event.addListener(map, 'click', function () {
      depMarker.map((ele, i) => {
        ele.setMap(null);
        return null;
      });

      arrMarker.map((ele, i) => {
        ele.setMap(null);
        return null;
      });
    });
  };

  return (
    <>
      <MapContent
        onContextMenu={openSelectWindow}
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
  outline: none;
  z-index: 0;

  .hi {
    position: relative;
    right: 20px;
    bottom: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 14px;

    .trans-info {
      padding: 5px 0px;
      ${({ theme }) => theme.variables.flex()}

      .tImg {
        margin-right: 5px;
        width: 10px;
      }
    }
  }

  .mapMarkers {
    padding: 10px;
    color: white;
    background-color: #3b3b3b;
    border: 1px solid #333333;
    border-right: 1px solid #5a5a5a;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
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

export default Map;
