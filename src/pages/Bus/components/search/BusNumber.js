import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';
import BUS_TYPE from '../../data/busType';

const BusNumber = ({ busInfo }) => {
  const { busNo, city, startEnd, typeName, busRouteId, type } = busInfo;
  const [color, setColor] = useState();

  useEffect(() => {
    BUS_TYPE.forEach((ele, key) => {
      if (type === ele.type) {
        setColor(ele.color);
      }
    });
  }, [type]);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component="a"
          href={`/bus/route?id=${busRouteId}&busNumber=${busNo}`}
        >
          <ListItemText>
            <BusContainer>
              <ImgBusNo>
                <img src="/images/bus/bus.svg" alt="busInfo" />
                <div>
                  <BusNo>{busNo}</BusNo>
                  <City>
                    {city}ㅣ{startEnd}
                  </City>
                </div>
              </ImgBusNo>
              <div>
                <BusType color={color}>{typeName}</BusType>
              </div>
            </BusContainer>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

const BusContainer = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between')};
`;

const ImgBusNo = styled.div`
  ${({ theme }) => theme.variables.flex()};

  div {
    margin-left: 8px;
  }
`;

const BusNo = styled.div`
  margin-bottom: 8px;
  color: #000000;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;

const City = styled.div`
  display: block;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #9e9e9e;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
`;

const BusType = styled.div`
  max-width: 49px;
  height: 20px;
  padding: 3px 5px;
  background: ${props => props.color};
  color: #ffffff;
  border-radius: 2px;
  text-align: center;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
`;

export default BusNumber;
