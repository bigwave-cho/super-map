import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BusRoute01 } from '../../images/busroute_01.svg';
import { ReactComponent as BusRoute02 } from '../../images/busroute_02.svg';
import { ReactComponent as BusRoute03 } from '../../images/busroute_03.svg';

const BusRoute = ({ station, busList, index, stationList, color }) => {
  const navigate = useNavigate();
  const { stationName, arsId, stationId, lat, lng } = station;
  const goToStation = () => {
    arsId &&
      navigate(
        `/bus/station?id=${stationId}&name=${stationName}&arsid=${arsId}&lat=${lat}&lng=${lng}&direction=${
          stationList[index + 1].stationName
        }`
      );
  };
  return (
    <>
      <RouteList onClick={goToStation} flex={index !== 0 ? true : false}>
        {busList?.map(bus => {
          return (
            bus.staOrder === index && (
              <Realtime key={bus.busnumPlate}>
                <RealtimeBusNo>{bus.busnumPlate}</RealtimeBusNo>
                <RealtimeBus
                  color={color}
                  src="/images/bus/realtimebus.svg"
                  alt="bus-icon"
                />
              </Realtime>
            )
          );
        })}
        {station.transPoint === 'Y' && (
          <TransPoint
            id="transPoint"
            src="/images/bus/transpoint.svg"
            alt="trans-point"
          />
        )}
        {index === 0 ? (
          <RouteImg>
            <BusRoute03 stroke={color} fill={color} />
          </RouteImg>
        ) : index === stationList.length - 1 ? (
          <RouteImg>
            <BusRoute02 stroke={color} fill={color} />
          </RouteImg>
        ) : (
          <RouteImg>
            <BusRoute01 stroke={color} fill={color} />
          </RouteImg>
        )}
        <Station>
          <StationName id={index}>{stationName}</StationName>
          <ArsId>{arsId}</ArsId>
        </Station>
      </RouteList>
    </>
  );
};

const Realtime = styled.span`
  display: flex;
  align-items: center;
`;

const RealtimeBus = styled.img`
  position: absolute;
  padding-left: 1px;
  left: 53px;
  width: 24px;
  height: 24px;
  background-color: ${props => props.color};
  box-shadow: 0px 2px 4px rgba(130, 130, 130, 0.25);
  border-radius: 4px;
  z-index: 100;
`;

const TransPoint = styled.img`
  position: absolute;
  left: 27px;
  bottom: 17px;
  z-index: 100;
`;

const RealtimeBusNo = styled.div`
  position: absolute;
  background-image: url('/images/bus/realtimebusno.svg');
  left: 12px;
  padding: 1.5px 3px;
  width: 36px;
  height: 17px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -1px;
  color: #ffffff;
`;

const RouteList = styled.a`
  position: relative;
  display: flex;
  align-items: ${props => (props.flex ? 'flex-start' : 'flex-end')};
  height: 56px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const RouteImg = styled.div`
  padding: 0 12px 0 58px;
  margin: 0 0 -3px;
`;

const Station = styled.span`
  position: relative;
  padding: 10px;
  width: 100%;
  height: 56px;

  &::after {
    position: absolute;
    bottom: 0;
    width: 100%;
    content: '';
    border-bottom: 1px solid #e3e3e3;
  }
`;

const StationName = styled.div`
  display: block;
  margin-bottom: 3px;
  max-width: 229px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #333333;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

const ArsId = styled.div`
  color: #8e8e93;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
`;

export default memo(BusRoute);
