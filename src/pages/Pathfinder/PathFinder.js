import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SearchList from '../Pathfinder/components/SearchList';
import SearchPath from '../Pathfinder/components/SearchPath';
import Map from './components/Map';
import Search from './components/Search';

const PathFinder = () => {
  const [searchLists, setSearchLists] = useState([]);
  const [summaryLists, setSummaryLists] = useState([]);
  const [showFinder, setShowFinder] = useState(true);
  const [searchValue, setSearchValue] = useState({
    departure: '',
    depLat: '',
    depLng: '',
    arrival: '',
    arrLat: '',
    arrLng: '',
  });
  const [focus, setFocus] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPathList, setShowPathList] = useState(false);

  const [PathData, setPathData] = useState([]);
  const [selectDetail, setSelectDetail] = useState(0);

  const [detailPath, setDetailPath] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/route/map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mapobject: PathData[selectDetail].mapobject,
        }),
      });

      const data = await response.json();
      setDetailPath(data.data);
    };

    if (PathData.length !== 0) {
      getData();
    }
    //eslint-disable-next-line
  }, [selectDetail, PathData]);
  // PathData, 의존성 배열에 있던 것 일단 빼봄

  const toggleFinder = () => {
    setShowFinder(prev => !prev);
  };

  const getSummaryLists = async () => {
    if (focus === '출발') {
      const response = await fetch(
        `/poi/list?searchKeyword=${searchValue.departure}`
      );
      const data = await response.json();
      !data.message && setSummaryLists(data.data.searchList);
    } else if (focus === '도착') {
      const response = await fetch(
        `/poi/list?searchKeyword=${searchValue.arrival}`
      );
      const data = await response.json();
      !data.message && setSummaryLists(data.data.searchList);
    }
  };

  useEffect(() => {
    if (
      (searchValue.departure && searchValue.departure.length > 1) ||
      searchValue.arrival.length > 1
    ) {
      const debounce = setTimeout(() => {
        getSummaryLists();
      }, 300); // debounce

      return () => clearTimeout(debounce);
    } else {
      setSummaryLists([]);
    }
    // eslint-disable-next-line
  }, [searchValue]);

  const handleDepInput = e => {
    setSearchValue(prev => ({ ...prev, departure: e.target.value }));
    setShowPathList(false);
  };

  const handleArrInput = e => {
    setSearchValue(prev => ({ ...prev, arrival: e.target.value }));
    setShowPathList(false);
  };

  const getSearchList = e => {
    if (e.keyCode === 27) {
      setShowDropdown(false);
    }
    if (e.keyCode === 13 || e.keyCode === 9) {
      fetch(`/poi/list?searchKeyword=${searchValue.departure}`)
        .then(res => res.json())
        .then(data => {
          setSearchLists(data.data.searchList);
          setSearchValue(prev => ({
            ...prev,
            departure: data.data.searchList[0].name,
            depLat: data.data.searchList[0].lat,
            depLng: data.data.searchList[0].lng,
          }));
        });

      setShowDropdown(false);
    } else if (e.keyCode === 8) {
      setPathData([]);
      setDetailPath(null);

      setSearchValue(prev => ({
        ...prev,
        depLat: '',
        depLng: '',
      }));
    }
  };

  const getArrList = e => {
    if (e.keyCode === 27) {
      setShowDropdown(false);
    }
    if (e.keyCode === 13) {
      fetch(`/poi/list?searchKeyword=${searchValue.arrival}`)
        .then(res => res.json())
        .then(data => {
          setSearchLists(data.data.searchList);
          setSearchValue(prev => ({
            ...prev,
            arrival: data.data.searchList[0].name,
            arrLat: data.data.searchList[0].lat,
            arrLng: data.data.searchList[0].lng,
          }));
        });

      setShowDropdown(false);
    } else if (e.keyCode === 8) {
      setPathData([]);
      setDetailPath(null);

      setSearchValue(prev => ({
        ...prev,
        arrLat: '',
        arrLng: '',
      }));
    }
  };

  const removeInput = e => {
    setShowPathList(false);
    setPathData([]);
    setDetailPath(null);

    if (e.currentTarget.className.includes('dep')) {
      setSummaryLists([]);
      setSearchValue(prev => ({
        ...prev,
        departure: '',
        depLat: '',
        depLng: '',
      }));
    } else {
      setSummaryLists([]);
      setSearchValue(prev => ({
        ...prev,
        arrival: '',
        arrLat: '',
        arrLng: '',
      }));
    }
  };

  const reverseInput = () => {
    setPathData([]);
    setShowPathList(false);
    setShowDropdown(false);
    setSearchValue(prev => ({
      ...prev,
      departure: prev.arrival,
      depLat: prev.arrLat,
      depLng: prev.arrLng,
      arrival: prev.departure,
      arrLat: prev.depLat,
      arrLng: prev.depLng,
    }));
  };

  const getRoutes = async e => {
    if (focus === '도착') return;

    setShowPathList(true);
    const response = await fetch(
      `/route/list?startLng=${searchValue.depLng}&startLat=${searchValue.depLat}&endLng=${searchValue.arrLng}&endLat=${searchValue.arrLat}&vehicletype=6&types=subway-bus&recentsearch=null`
    );
    const data = await response.json();
    setPathData(data.data.routelist);

    setSelectDetail(0);
    setShowDropdown(false);
    setSearchLists([]);
  };

  return (
    <PathFinders>
      <PathFinderContatiner toggle={showFinder}>
        <Search
          setShowPathList={setShowPathList}
          reverseInput={reverseInput}
          searchValue={searchValue}
          getSearchList={getSearchList}
          handleDepInput={handleDepInput}
          setSummaryLists={setSummaryLists}
          summaryLists={summaryLists}
          setFocus={setFocus}
          focus={focus}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          removeInput={removeInput}
          setSearchValue={setSearchValue}
          getArrList={getArrList}
          setSearchLists={setSearchLists}
          handleArrInput={handleArrInput}
          getRoutes={getRoutes}
          showFinder={showFinder}
          toggleFinder={toggleFinder}
        />
        {!showPathList && (
          <SearchList
            setSearchLists={setSearchLists}
            setSummaryLists={setSummaryLists}
            focus={focus}
            setSearchValue={setSearchValue}
            searchLists={searchLists}
            setShowDropdown={setShowDropdown}
          />
        )}
        {PathData.length !== 0 && showPathList && (
          <SearchPath
            selectDetail={selectDetail}
            setDetailPath={setDetailPath}
            PathData={PathData}
            setSelectDetail={setSelectDetail}
          />
        )}
        {PathData.length === 0 && showPathList && (
          <div id="loading-img-container">
            <img
              id="loading-img"
              src="https://media0.giphy.com/media/xT9DPldJHzZKtOnEn6/giphy.gif?cid=ecf05e47pgem4ptsc4h0ufyw22r5hk0zv9xwxjlmj9tv13p2&rid=giphy.gif&ct=g"
              alt="pray for No Error"
            ></img>
          </div>
        )}
      </PathFinderContatiner>
      <Map
        setPathData={setPathData}
        setSearchValue={setSearchValue}
        detailPath={detailPath}
        setDetailPath={setDetailPath}
        searchValue={searchValue}
        PathData={PathData}
        getRoutes={getRoutes}
      />
    </PathFinders>
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

const PathFinders = styled.div`
  display: flex;
`;

const PathFinderContatiner = styled.div`
  position: relative;
  margin-left: 100px;
  width: 360px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  z-index: 1;

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${props => (props.toggle ? fadeOut : fadeIn)};
  animation-fill-mode: forwards;

  #loading-img-container {
    width: 100%;
    height: calc(100vh - 180px);
    ${({ theme }) => theme.variables.flex('', 'flex-start')}

    #loading-img {
      position: relative;
      bottom: 100px;
      width: 100%;
    }
  }
`;

export default PathFinder;
