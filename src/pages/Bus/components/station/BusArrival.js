import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BUS_TYPE from '../../data/busType';

const BusArrival = ({ busArrival, routeId }) => {
  const { busNo, nextStation, arrivalTime, remainingStops, busType } =
    busArrival;
  const [color, setColor] = useState();
  const [typeName, setTypeName] = useState();

  useEffect(() => {
    BUS_TYPE.forEach(ele => {
      if (busType == ele.type) {
        setColor(ele.color);
        setTypeName(ele.typeName);
      }
    });
  }, [busType]);

  const handleBusRealtime = e => console.log(e.currentTarget);

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton
          component="a"
          href={`/bus/route?id=${routeId}&busNumber=${busNo}`}
          sx={{ height: '90px' }}
        >
          <ListItemText>
            <BusList>
              <li>
                <BusTypeNo>
                  <BusType color={color}>{typeName}</BusType>
                  <BusNo>{busNo}</BusNo>
                </BusTypeNo>
                <Direction>
                  <NextStation>{nextStation}</NextStation>
                  <span>방향</span>
                </Direction>
                {arrivalTime.length > 0 ? (
                  arrivalTime.map((e, i) => {
                    const minutes = Math.floor(e / 60);
                    return (
                      <span key={i}>
                        {minutes >= 1 ? (
                          <Minutes> {minutes}분</Minutes>
                        ) : (
                          <Minutes>곧 도착</Minutes>
                        )}
                        <Stops> ({remainingStops[i]}정류장)</Stops>
                        &nbsp;&nbsp;
                      </span>
                    );
                  })
                ) : (
                  <Stops>도착 예정 정보 없음</Stops>
                )}
              </li>
              <li>
                <RealtimeBtn onClick={handleBusRealtime}>
                  <img
                    src="/images/bus/busrealtime.svg"
                    alt="realtime-button"
                  />
                </RealtimeBtn>
              </li>
            </BusList>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
};

const BusList = styled.ul`
  ${({ theme }) => theme.variables.flex('', 'space-between')}
`;

const BusTypeNo = styled.div`
  ${({ theme }) => theme.variables.flex('', 'flex-start')}
`;

const BusType = styled.span`
  margin-right: 9px;
  padding: 1px 3px;
  background: ${props => props.color};
  color: #ffffff;
  border-radius: 2px;
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
`;

const BusNo = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #000000;
`;

const Direction = styled.div`
  ${({ theme }) => theme.variables.flex('', 'flex-start')}
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #6a6a6a;
`;

const NextStation = styled.span`
  display: block;
  max-width: 163px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Minutes = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #e74f4f;
`;

const Stops = styled(Minutes)`
  color: #333333;
`;

const RealtimeBtn = styled.div`
  z-index: 1000;
`;
export default memo(BusArrival);
