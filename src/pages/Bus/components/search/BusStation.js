import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';

const BusStation = ({ stationInfo }) => {
  const { stationName, lat, lng, stationId, arsId } = stationInfo;
  const [address, setAddress] = useState();
  useEffect(() => {
    fetch(`/poi/geocoding?lng=${lng}&lat=${lat}`)
      .then(response => response.json())
      .then(result => setAddress(result.data.address));
  }, [lat, lng]);
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component="a"
          href={`/bus/station?id=${stationId}&name=${stationName}&arsid=${arsId}&lat=${lat}&lng=${lng}`}
        >
          <ListItemText>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={1}>
                <img src="/images/bus/station.svg" alt="busStation" />
              </Grid>
              <Grid item xs={8}>
                <StationName>{stationName}</StationName>
                <Address>{address}</Address>
              </Grid>
              <Grid item xs={3}>
                <StationType>버스정류장</StationType>
              </Grid>
            </Grid>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

const StationName = styled.div`
  margin-bottom: 8px;
  color: #000000;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;

const Address = styled.div`
  display: block;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #9e9e9e;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
`;

const StationType = styled.div`
  color: #9e9e9e;
  text-align: end;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
`;

export default BusStation;
