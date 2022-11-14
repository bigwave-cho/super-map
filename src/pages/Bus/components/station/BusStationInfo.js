import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import BusArrival from './BusArrival';
import dayjs from 'dayjs';
import MapBus from '../../MapBus';
import FoldButton from '../button/FoldButton';
import CancelButton from '../button/CancelButton';
import { ReactComponent as RefreshBtn } from '../../images/refresh.svg';

const BusStationInfo = () => {
  const [stationInfo, setStationInfo] = useState({});
  const [realTimeInfo, setRealTimeInfo] = useState([]);
  const [stationId, setStationId] = useState();
  const [stationName, setStationName] = useState();
  const [arsId, setArsId] = useState();

  const [refresh, setRefresh] = useState();
  const [count, setCount] = useState(10);

  const now = dayjs();
  const currentTime = now.format('HH:mm');

  const [showFinder, setShowFinder] = useState(true);
  const navigate = useNavigate();

  //정류소 상세정보 데이터
  useEffect(() => {
    setStationId(new URL(window.location.href).searchParams.get('id'));
    setStationName(new URL(window.location.href).searchParams.get('name'));
    setArsId(new URL(window.location.href).searchParams.get('arsid'));

    stationId &&
      fetch(
        `/bus/station/arrival/v2?stationId=${stationId}&stationName=${stationName}&arsId=${arsId}`
      )
        .then(response => response.json())
        .then(result =>
          result.message === null
            ? (alert('데이터가 없습니다!'), navigate(-1))
            : (setStationInfo(result.data),
              setRealTimeInfo(result.data.busList))
        );
  }, [stationId, stationName, arsId, refresh]);

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
  return (
    <>
      <MapBus direction={stationInfo.direction} />
      <StationBox toggle={showFinder}>
        <span onClick={goToBackPage}>
          <ArrowBack src="/images/bus/arrow-back.svg" alt="arrow-back" />
        </span>
        <RouteTitle>
          <NameTimer>
            <StationName>{stationName}</StationName>
            <Time>
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
            </Time>
          </NameTimer>
          <StationInfo>
            <span>{arsId} ㅣ </span>
            <Direction>{stationInfo.direction}</Direction>
            <span>방면</span>
          </StationInfo>
        </RouteTitle>
        <BusList>
          {realTimeInfo?.map(busArrival => (
            <BusArrival
              key={busArrival.busRouteId}
              busArrival={busArrival}
              routeId={busArrival.busRouteId}
            />
          ))}
        </BusList>
        <CancelButton />
        <FoldButton toggle={showFinder} toggleFinder={toggleFinder} />
      </StationBox>
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

const StationBox = styled.div`
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

const ArrowBack = styled.img`
  padding: 32px 18px 12px;
  cursor: pointer;
`;

const RouteTitle = styled.div`
  padding: 0 18px 14px;
  border-bottom: 1px solid #eef0f0;

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #787878;
  }
`;

const StationInfo = styled.div`
  display: flex;
`;

const StationName = styled.div`
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #333333;
`;

const Direction = styled.span`
  display: block;
  max-width: 164px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NameTimer = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between')}
  color: #9e9e9e;
  font-weight: 400;
  font-size: 13px;
`;

const Time = styled(NameTimer)`
  ${({ theme }) => theme.variables.flex('', 'space-between')}
  width: 60px;
`;

const BusList = styled.div`
  padding-bottom: 13px;
  height: calc(100vh - 124px);
  overflow-y: scroll;
  overflow-x: hidden;
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
export default BusStationInfo;
