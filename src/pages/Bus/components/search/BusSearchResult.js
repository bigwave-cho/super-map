import React from 'react';
import styled from 'styled-components';
import BusNumber from './BusNumber';
import BusStation from './BusStation';

const BusSearchResult = ({ busNoList, busStationList }) => {
  return (
    <Result>
      {busNoList?.map(busInfo => (
        <BusNumber key={busInfo.busRouteId} busInfo={busInfo} />
      ))}
      {busStationList?.map(stationInfo => (
        <BusStation key={stationInfo.stationId} stationInfo={stationInfo} />
      ))}
    </Result>
  );
};

const Result = styled.div`
  padding-bottom: 13px;
  height: calc(100vh - 97px);
  border-top: 4px solid #f7f7f7;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default BusSearchResult;
