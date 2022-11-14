import React from "react";
import Map from "./components/Map";
import styled from "styled-components";

function Main() {
  return (
    <MapWrap>
      <Map />
    </MapWrap>
  );
}

const MapWrap = styled.div`
  width: calc(100% - 100px);
  margin-left: 100px;
`;

export default Main;
