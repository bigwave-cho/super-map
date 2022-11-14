import React from 'react';
import styled from 'styled-components';

const Search = ({
  reverseInput,
  searchValue,
  getSearchList,
  handleDepInput,
  setSummaryLists,
  setFocus,
  setShowDropdown,
  showDropdown,
  focus,
  removeInput,
  setSearchValue,
  getArrList,
  setSearchLists,
  handleArrInput,
  getRoutes,
  showFinder,
  toggleFinder,
  summaryLists,
}) => {
  return (
    <>
      <ToggleBtn toggle={showFinder} onClick={toggleFinder}>
        <img alt="toggle" />
      </ToggleBtn>
      <SearchBox>
        <div className="upperBox">
          <button onClick={reverseInput} className="reverseBtn"></button>
          <div className="inputContainer">
            <SearchInputBox
              dep={searchValue.departure}
              modal={searchValue.arrival}
            >
              <div className="dot" />
              <input
                onKeyDown={getSearchList}
                value={searchValue.departure}
                onChange={handleDepInput}
                onFocus={() => {
                  setSummaryLists([]);
                  setFocus('출발');
                  setShowDropdown(true);
                }}
                onBlur={() => {
                  setShowDropdown(false);
                }}
                type="text"
                placeholder="출발지를 입력해 주세요"
              ></input>
              <div onClick={removeInput} className="delete-btn dep">
                <img src="/images/pathfinder/Round.png" alt="deleteValue"></img>
              </div>
              <div className="related-dropdown">
                {focus === '출발' &&
                  showDropdown &&
                  summaryLists.map((ele, i) => {
                    if (i < 3)
                      return (
                        <div
                          onClick={e => {
                            let inputValue = e.target.innerHTML;
                            console.log(ele);
                            setSearchValue(prev => ({
                              ...prev,
                              departure: inputValue,
                              depLat: ele.lat,
                              depLng: ele.lng,
                            }));
                            setShowDropdown(false);
                          }}
                          key={i}
                        >
                          {ele.name}
                        </div>
                      );

                    return null;
                  })}
              </div>
            </SearchInputBox>
            <ArrivalInputBox dep={searchValue.arrival}>
              <div className="dot" />
              <input
                onBlur={() => {
                  setFocus();
                }}
                onKeyDown={getArrList}
                value={searchValue.arrival}
                onChange={handleArrInput}
                onFocus={() => {
                  setFocus('도착');
                  setShowDropdown(true);
                  setSearchLists([]);
                }}
                type="text"
                placeholder="도착지를 입력해 주세요"
              ></input>
              <div onClick={removeInput} className="delete-btn arr">
                <img src="/images/pathfinder/Round.png" alt="deleteValue"></img>
              </div>
              <div className="arr-related-dropdown">
                {focus === '도착' &&
                  showDropdown &&
                  // eslint-disable-next-line
                  summaryLists.map((ele, i) => {
                    if (i < 3)
                      return (
                        <div
                          onClick={e => {
                            let inputValue = e.target.innerHTML;
                            setSearchValue(prev => ({
                              ...prev,
                              arrival: inputValue,
                              arrLat: ele.lat,
                              arrLng: ele.lng,
                            }));
                            setShowDropdown(false);
                          }}
                          key={i}
                        >
                          {ele.name}
                        </div>
                      );
                  })}
              </div>
            </ArrivalInputBox>
          </div>
        </div>
        <button
          primary={searchValue.depLat && searchValue.arrLat ? 'true' : 'false'}
          className="searchBtn"
          disabled={searchValue.depLat && searchValue.arrLat ? false : true}
          onClick={getRoutes}
        >
          길찾기
        </button>
      </SearchBox>
    </>
  );
};

const SearchBox = styled.div`
  position: relative;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  border: 1px solid #e8e8e8;

  .upperBox {
    display: flex;
    align-items: center;
    padding-top: 28px;
    margin-right: 18px;

    .reverseBtn {
      width: 18px;
      height: 18px;
      margin: 0px 14px 0px 18px;
      border: 0px;
      background-image: url('/images/pathfinder/navigation_switch.png');
      background-size: 100% 100%;
      background-color: white;

      &:hover {
        border: 1px solid #2fc863;
      }
    }

    .inputContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  button {
    width: 74px;
    height: 38px;
    top: 128px;
    margin-right: 18px;

    color: white;
    background: #2fc863;
    border-radius: 4px;
    border: 0px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;

    &:disabled {
      background-color: #cccccc;
    }

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;

const SearchInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 286px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid #9e9e9e;
  border-radius: 4px;

  .related-dropdown {
    position: absolute;
    top: 40px;
    left: -1px;
    width: 287px;
    z-index: 2;

    background: #fefefe;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 8px 8px;

    div {
      padding: 14px 0px 11px 11px;

      font-weight: 400;
      font-size: 16px;
      line-height: 19px;

      &:hover {
        background-color: #f0f7ff;
      }
    }
  }

  input::placeholder {
    color: #b2b2b2;
  }

  &:focus-within {
    border: 1px solid #2fc863;

    .dot {
      background-color: #2fc863;
    }
  }

  .dot {
    position: absolute;
    left: 14px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #898989;
  }

  .delete-btn {
    position: absolute;
    right: 12px;
    width: 18px;
    height: 18px;
    display: ${props => (props.dep ? 'block' : 'none')};
    padding: 1.5px;
  }

  input {
    position: absolute;
    left: 28px;
    width: 219px;
    height: 19px;

    border: 0px;
    outline: none;
  }
`;

const ArrivalInputBox = styled(SearchInputBox)`
  .delete-btn {
    position: absolute;
    right: 12px;
    width: 18px;
    height: 18px;
    display: ${props => (props.dep ? 'block' : 'none')};
    padding: 1.5px;
  }

  .arr-related-dropdown {
    position: absolute;
    top: 40px;
    left: -1px;
    width: 287px;
    z-index: 1;

    background: #fefefe;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 8px 8px;

    div {
      padding: 14px 0px 11px 11px;

      font-weight: 400;
      font-size: 16px;
      line-height: 19px;

      &:hover {
        background-color: #f0f7ff;
      }
    }
  }
`;

const ToggleBtn = styled.div`
  position: absolute;
  right: -28px;
  top: 50vh;
  width: 28px;
  height: 56px;
  ${({ theme }) => theme.variables.flex()}

  z-index: 1;
  border: 1px solid #dbdbdb;
  border-radius: 0px 8px 8px 0px;
  background-color: #ffffff;

  &:hover {
    background-color: #f0f7ff;
  }

  img {
    content: ${props =>
      props.toggle
        ? "url('/images/pathfinder/ic_fold.png')"
        : "url('/images/pathfinder/ic_unfold.png')"};
  }
`;

export default Search;
