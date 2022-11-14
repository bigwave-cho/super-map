import React from 'react';
import styled from 'styled-components';

const SearchList = ({
  setSearchLists,
  focus,
  searchLists,
  setSearchValue,
  setShowDropdown,
  setSummaryLists,
}) => {
  const selectInput = e => {
    let selectedAddress = e.currentTarget.className;

    const getInfo = async () => {
      const response = await fetch(`/poi/address?address=${selectedAddress}`);
      return response.json();
    };
    getInfo().then(data => {
      const info = data.data.resultlist[0];
      if (focus === '출발') {
        setSearchValue(prev => ({
          ...prev,
          departure: selectedAddress,
          depLat: info.lat,
          depLng: info.lng,
        }));
        setSearchLists([]);
        setSummaryLists([]);
        setShowDropdown(false);
      } else if (focus === '도착') {
        setSearchValue(prev => ({
          ...prev,
          arrival: selectedAddress,
          arrLat: info.lat,
          arrLng: info.lng,
        }));
        setSearchLists([]);
        setSummaryLists([]);
        setShowDropdown(false);
      }
    });
  };

  return (
    <SearchResultBox>
      {searchLists.map((ele, i) => {
        return (
          <li
            className={ele.address}
            lat={ele.lat}
            onClick={selectInput}
            lng={ele.lng}
            key={i}
          >
            <div className="mapsMarker">
              <img alt="map-marker" />
            </div>
            <SearchContent>
              <div>{ele.name}</div>
              <div>{ele.address}</div>
            </SearchContent>
          </li>
        );
      })}
    </SearchResultBox>
  );
};

const SearchResultBox = styled.ul`
  height: calc(100vh - 180px);
  overflow: scroll;
  border-top: 4px solid #f7f7f7;

  li {
    ${props => props.theme.variables.flex('', 'flex-start')}
    padding: 20px 0px 20px 20px;
    border-bottom: 1px solid lightgray;

    &:hover {
      background-color: #f0f7ff;
    }
  }

  .mapsMarker {
    width: 17px;
    height: 17px;

    img {
      width: 100%;
      height: 100%;
      content: url('/images/pathfinder/maps_place.png');
    }
  }

  div {
    margin-right: 10px;
  }
`;

const SearchContent = styled.div`
  div {
    :first-child {
      margin-bottom: 5px;
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
    }

    :last-child {
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;

      color: #9e9e9e;
    }
  }
`;

export default SearchList;
