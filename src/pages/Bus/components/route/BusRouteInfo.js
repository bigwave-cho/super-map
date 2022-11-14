import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import BusRoute from './BusRoute';
import BUS_TYPE from '../../data/busType';
import dayjs from 'dayjs';
import MapBus from '../../MapBus';
import FoldButton from '../button/FoldButton';
import CancelButton from '../button/CancelButton';
import { ReactComponent as RealtimeBtn } from '../../images/realtime-button.svg';
import { ReactComponent as RefreshBtn } from '../../images/refresh.svg';

const BusRouteInfo = () => {
  const [routeInfo, setRouteInfo] = useState({});
  const [realTimeInfo, setRealTimeInfo] = useState({});
  const { busCount, busList } = realTimeInfo;
  const [routeId, setRouteId] = useState();
  const {
    busNo,
    direction1,
    direction2,
    startStation,
    endStation,
    beginTime,
    lastTime,
    term,
    stationList,
    routeType,
  } = routeInfo;

  const [typeName, setTypeName] = useState();
  const [color, setColor] = useState();
  const [refresh, setRefresh] = useState();

  const now = dayjs();
  const currentTime = now.format('HH:mm');
  const [count, setCount] = useState(10);

  const navigate = useNavigate();
  const [showFinder, setShowFinder] = useState(true);
  const [paintMap, setPaintMap] = useState(false);
  const [coordinate, setCoordinates] = useState([]);
  const [mapBusList, setMapBusLsit] = useState([]);
  const [busNumber, setBusNumber] = useState();

  //버스노선 상세정보 데이터, 지도에 노선표시
  useEffect(() => {
    setRouteId(new URL(window.location.href).searchParams.get('id'));
    setBusNumber(new URL(window.location.href).searchParams.get('busNumber'));

    if (routeId) {
      fetch(`/bus/routeinfo?busRouteId=${routeId}`)
        .then(response => response.json())
        .then(result =>
          result.message === null
            ? (alert('데이터가 없습니다!'), navigate(-1))
            : setRouteInfo(result.data)
        );

      fetch(`/bus/route/line?busRouteId=${routeId}&busNo=${busNumber}`)
        .then(response => response.json())
        .then(result =>
          setCoordinates(result.data.routeList.features[0].geometry.coordinates)
        );
    }
  }, [routeId]);

  //버스 실시간 정보
  useEffect(() => {
    routeId &&
      fetch(`/bus/positioninfo?busrouteId=${routeId}`)
        .then(response => response.json())
        .then(result => setRealTimeInfo(result.data));
  }, [routeId, refresh]);

  useEffect(() => {
    BUS_TYPE.forEach(ele => {
      if (routeType == ele.type) {
        setColor(ele.color);
        setTypeName(ele.typeName);
      }
    });
  }, [routeType]);

  //타이머
  useEffect(() => {
    const timer = () => setCount(count - 1);
    if (count <= 0) {
      setRefresh(prev => (prev ? !prev : true));
      return setCount(10);
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [count]);

  const toggleFinder = () => {
    setShowFinder(prev => !prev);
  };

  const goToBackPage = () => navigate(-1);

  //실시간 버스 표시
  const handleBusRealtime = () => {
    setPaintMap(prev => !prev);
  };
  useEffect(() => {
    setBusNumber(new URL(window.location.href).searchParams.get('busNumber'));
    if (routeId) {
      fetch(`/bus/route/position?busNo=11&busRouteId=${routeId}`)
        .then(response => response.json())
        .then(result => {
          if (result.data[0].vehicleList.length === 0) {
            console.log('운행 정보가 없습니다.');
          }
          setMapBusLsit(result.data[0].vehicleList);
        });
    }
  }, [paintMap, refresh]);

  return (
    <>
      <MapBus
        paintMap={paintMap}
        coordinate={coordinate}
        color={color}
        mapBusList={mapBusList}
        busNo={busNo}
      />
      <RouteBox toggle={showFinder}>
        <RouteInfo>
          <span onClick={goToBackPage}>
            <img src="/images/bus/arrow-back.svg" alt="arrow-back" />
          </span>
          <RouteTitle>
            <div>
              <BusType color={color}>{typeName}</BusType>
              <BusNo>{busNo}</BusNo>
            </div>
            <RealtimeBtn
              fill={paintMap ? '#3A83F7' : '#D5D5D5'}
              stroke={paintMap ? '#3A83F7' : '#D5D5D5'}
              onClick={handleBusRealtime}
              style={{ cursor: 'pointer' }}
            />
          </RouteTitle>
          <li>
            <StartStation>{startStation}</StartStation>
            <span>&nbsp;↔&nbsp;</span>
            <EndStation>{endStation}</EndStation>
          </li>
          <li>
            <span>운행시간</span>&nbsp;
            <span>{beginTime}~</span>
            <span>{lastTime}</span>&nbsp;
            <span>/&nbsp;배차간격</span>
            <Term>&nbsp;{term}</Term>
            <span>분</span>
          </li>
        </RouteInfo>
        <ButtonList>
          <BusCount>{busCount}</BusCount>
          <div>대 운행중&nbsp;·&nbsp;</div>
          <div>{currentTime}&nbsp;</div>
          <Count>
            <span>{count}</span>
            <RefreshBtn
              style={{
                position: 'absolute',
                transform: count >= 10 ? 'rotate(360deg)' : 'rotate(0)',
                transition: count >= 10 ? '1s' : 'all 0.0s',
              }}
              stroke={count >= 10 ? '#2FC863' : '#9E9E9E'}
            />
          </Count>
        </ButtonList>
        <RouteTab>
          <a href="#0">
            <li>
              <span>{direction1}</span>
              <span>&nbsp;방면</span>
            </li>
          </a>
          <a href="#transPoint">
            <li>
              <span>{direction2}</span>
              <span>&nbsp;방면</span>
            </li>
          </a>
        </RouteTab>
        <StationList>
          {stationList?.map((station, index) => {
            return (
              <BusRoute
                key={station.stationId + index}
                station={station}
                busList={busList}
                index={index}
                stationList={stationList}
                color={color}
              />
            );
          })}
        </StationList>
        <CancelButton />
        <FoldButton toggle={showFinder} toggleFinder={toggleFinder} />
      </RouteBox>
    </>
  );
};

const fadeIn = keyframes`
  from {
    right: 0px
  }
  to {
    right: 360px
  }
`;

const fadeOut = keyframes`
  from {
    right: 360px
  }
  to {
    right: 0px
  }
`;

const RouteBox = styled.div`
  position: relative;
  margin-left: 100px;
  width: 360px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  z-index: 1;

  animation-duration: ${props => (props.toggle ? 0 : '0.25s;')};
  animation-timing-function: ease-out;
  animation-name: ${props => (props.toggle ? fadeOut : fadeIn)};
  animation-fill-mode: forwards;
`;

const StationList = styled.div`
  padding-bottom: 13px;
  height: calc(100vh - 247.5px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const RouteTitle = styled.li`
  ${({ theme }) => theme.variables.flex('', 'space-between')};
  margin-top: 14px;

  div {
    ${({ theme }) => theme.variables.flex()};
  }
`;

const RouteInfo = styled.ul`
  padding: 32px 18px 8px;
  border-bottom: 1px solid #f7f7f7;

  li {
    display: flex;
    margin-bottom: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #9e9e9e;
  }

  img {
    cursor: pointer;
  }
`;

const StartStation = styled.span`
  display: block;
  max-width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const EndStation = styled(StartStation)``;

const Term = styled.span`
  color: #333333;
`;

const BusType = styled.span`
  padding: 2px 5px;
  background: ${props => props.color};
  color: #ffffff;
  border-radius: 2px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
`;

const BusNo = styled.span`
  display: block;
  max-width: 251px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-left: 6px;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

const ButtonList = styled.div`
  ${({ theme }) => theme.variables.flex('', 'flex-end')}
  padding: 10px 19px;
  border-bottom: 1px solid #e3e3e3;
  color: #9e9e9e;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
`;

const BusCount = styled.div`
  color: #333333;
`;

const RouteTab = styled.ul`
  ${({ theme }) => theme.variables.flex('', 'space-around')}
  padding: 14px 18px;
  border-bottom: 1px solid #e3e3e3;

  li {
    display: flex;
  }

  span {
    display: block;
    max-width: 108px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #838383;
    white-space: nowrap;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
`;

const Count = styled.div`
  ${({ theme }) => theme.variables.flex()}
  margin-left: 4px;
  width: 20px;
  text-align: end;

  span {
    font-weight: 500;
    font-size: 9px;
  }
`;

export default BusRouteInfo;
