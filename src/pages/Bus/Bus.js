import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BusSearchResult from './components/search/BusSearchResult';
import BusSearch from './components/search/BusSearch';
import MapBus from './MapBus';
import FoldButton from './components/button/FoldButton';

const Bus = () => {
  const [busStationList, setBusStationList] = useState([]);
  const [busNoList, setBusNoList] = useState([]);
  const [listAll, setListAll] = useState({});
  const [anchor, setAnchor] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState([]);

  const [showFinder, setShowFinder] = useState(true);

  const handleChange = event => {
    setOptions([]);
    setAnchor(event.currentTarget.value);
    setSelectedValue('');
  };

  const searchClickHandler = event => {
    setSelectedValue(event.target.innerText);
    setAnchor('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    options[0].busNo
      ? setSelectedValue(options[0].busNo)
      : setSelectedValue(options[0].stationName);
    setAnchor('');
  };

  const handleClose = () => {
    setAnchor(null);
  };

  //버스번호, 정류장 검색 결과 데이터
  useEffect(() => {
    anchor &&
      anchor.length > 1 &&
      fetch(`/poi/list/all?searchKeyword=${anchor}`)
        .then(response => response.json())
        .then(result => {
          if (result.data) {
            setListAll(result.data);
          }
        });
    selectedValue &&
      selectedValue.length > 1 &&
      fetch(`/poi/list/all?searchKeyword=${selectedValue}`)
        .then(response => response.json())
        .then(result => {
          if (result.data) {
            setBusStationList(result.data.busStationList);
            setBusNoList(result.data.busNoList);
          }
        });
  }, [anchor, selectedValue]);

  useEffect(() => {
    listAll.busNoList?.length > 0
      ? setOptions(listAll.busNoList)
      : setOptions(listAll.busStationList);
  }, [listAll.busNoList, listAll.busStationList]);

  const toggleFinder = () => {
    setShowFinder(prev => !prev);
  };

  return (
    <>
      <MapBus />
      <SearchBox toggle={showFinder}>
        <BusSearch
          anchor={anchor}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          selectedValue={selectedValue}
          handleClose={handleClose}
          searchClickHandler={searchClickHandler}
          options={options}
        />
        <BusSearchResult
          busNoList={busNoList}
          busStationList={busStationList}
        />
        <FoldButton toggle={showFinder} toggleFinder={toggleFinder} />
      </SearchBox>
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

const SearchBox = styled.div`
  position: relative;
  margin-left: 100px;
  width: 360px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  z-index: 1;

  animation-duration: ${props => (props.toggle ? 0 : '0.25s')};
  animation-timing-function: ease-out;
  animation-name: ${props => (props.toggle ? fadeOut : fadeIn)};
  animation-fill-mode: forwards;
`;

export default Bus;
