import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SUBWAY_COLOR_NAME_DATA from './SUBWAY_COLOR_NAME_DATA';

const Subway = () => {
  const [showFinder, setShowFinder] = useState(true);
  const [activeBtn, setActiveBtn] = useState(false);

  const [inputKeywordDeparture, setInputKeywordDeparture] = useState('');
  const [inputKeywordArrivals, setInputKeywordArrivals] = useState('');

  const [convertCodeDeparture, setConvertCodeDeparture] = useState('');
  const [convertCodeArrivals, setConvertCodeArrivals] = useState('');

  const [searchResultData, setSearchResultData] = useState([]); // input 창 검색 결과
  const [searchResultData2, setSearchResultData2] = useState([]); // input 창 검색 결과
  const [submitResultData, setSubmitResultData] = useState({}); //검색 결과
  const [filteredStnData, setFilteredStnData] = useState([]); // 검색창에서 필터링 된 정보

  const [pathDetailData, setPathDetailData] = useState({});
  const [minTransferData, setMinTransferData] = useState({});
  const [shortestData, setShortestData] = useState({});

  const toggleFinder = () => {
    setShowFinder(prev => !prev);
    document.getElementsByClassName('aside')[0].style.animationDuration =
      '0.25s';
  };

  const onChangeDeparture = e => {
    setInputKeywordDeparture(e.target.value);
    setConvertCodeDeparture(searchResultData[0].stationId);
    // console.log(convertCodeDeparture);
  };

  const onChangeArrivals = e => {
    setInputKeywordArrivals(e.target.value);
    setConvertCodeArrivals(searchResultData2[0].stationId);
    // console.log(convertCodeArrivals);
  };

  const handleBtnActive = () => {
    if (inputKeywordDeparture && inputKeywordArrivals) {
      setActiveBtn(true);
    }
  };

  // console.log(inputKeywordDeparture, inputKeywordArrivals);

  const submitData = e => {
    e.preventDefault();
    if (inputKeywordDeparture && inputKeywordArrivals) {
      SearchSubwayData();
      //console.log('submitData');

      handleSearchStationId();

      setInputKeywordDeparture([]);
      setInputKeywordArrivals([]);
    }

    if (submitResultData.pathDetail) {
      setPathDetailData(submitResultData.pathDetail);
      // console.log(submitResultData.pathDetail);
    }

    if (submitResultData.pathDetail.minTransfer) {
      setMinTransferData(submitResultData?.pathDetail.minTransfer);
      // console.log(submitResultData.pathDetail.minTransfer);
    }

    if (submitResultData.pathDetail.minTransfer) {
      setShortestData(submitResultData?.pathDetail.shortest);
      // console.log(submitResultData.pathDetail.minTransfer);
    }

    // console.log(pathDetailData, minTransferData, shortestData);

    handleBtnActive();
  };

  const SearchSubwayData = () => {
    if (inputKeywordDeparture.length >= 2 || inputKeywordArrivals.length >= 2) {
      // console.log(inputKeywordDeparture, inputKeywordArrivals);

      fetch(
        `/poi/list/all?searchKeyword=${
          inputKeywordDeparture && inputKeywordArrivals
            ? inputKeywordArrivals
            : inputKeywordDeparture
        }`
      )
        .then(res => res.json())
        .then(result => {
          inputKeywordDeparture && inputKeywordArrivals
            ? setSearchResultData2(result.data.subwayStationList)
            : setSearchResultData(result.data.subwayStationList);
        });
    }
    // console.log(searchResultData);
    // console.log(searchResultData2);
  };

  const handleSearchStationId = () => {
    fetch(
      `/route/subway/v2?from=${convertCodeDeparture}&to=${convertCodeArrivals}`
    )
      .then(res => res.json())
      .then(result => {
        // console.log(result.data);
        setSubmitResultData(result.data);
      });
  };

  useEffect(() => {
    SearchSubwayData();
    handleBtnActive();
  }, [inputKeywordDeparture, inputKeywordArrivals]);

  const clearInput = e => {
    if (window.event.keyCode === 13) {
      console.log(e);
    }
  };

  const closedList = e => {
    //console.log('closedList', e.target.nextSibling.style.display);

    e.target.nextSibling.style.display = 'none';
  };

  return (
    <>
      <SubwaySection>
        <Aside toggle={showFinder} activeBtn={activeBtn} className="aside">
          <ToggleButton toggle={showFinder} onClick={toggleFinder}>
            <ToggleImage alt="toggle" />
          </ToggleButton>
          <SearchSection>
            <SearchWarp autocomplete="off" onSubmit={submitData}>
              <ChangeButton>
                <img
                  src="/images/pathfinder/navigation_switch.png"
                  alt="button"
                  style={{ width: `18px` }}
                />
              </ChangeButton>
              <SearchInputWarp>
                <SeachBox>
                  <ListSearchUl>
                    <ListSearchLi>
                      <SearchInput1
                        type="text"
                        name="subway"
                        placeholder="출발지를 입력해 주세요"
                        value={inputKeywordDeparture}
                        onChange={onChangeDeparture}
                        onKeyup={clearInput}
                        onBlur={closedList}
                      />
                      <ResultStationListWrap
                        style={{
                          display:
                            searchResultData &&
                            inputKeywordDeparture.length >= 2
                              ? `inline-block`
                              : `none`,
                        }}
                      >
                        <ResultStationList>
                          {searchResultData?.map((lineData, index) => {
                            return (
                              <>
                                <ResultStationItem
                                  key={index}
                                  onClick={handleSearchStationId}
                                >
                                  <StationNameSpan id="stationNameSpan">
                                    {lineData.stationName.substr(
                                      0,
                                      lineData.stationName.indexOf(' ')
                                    )}
                                    &ensp;
                                  </StationNameSpan>
                                  <LineNumColor
                                    style={{
                                      data: SUBWAY_COLOR_NAME_DATA.filter(
                                        item => {
                                          const lineColor =
                                            item.lineName.indexOf(
                                              lineData.lineName
                                            ) > -1;

                                          if (lineColor) {
                                            return item.color;
                                          }
                                        }
                                      ),
                                    }}
                                  >
                                    &ensp;{lineData.lineName}&ensp;
                                  </LineNumColor>
                                </ResultStationItem>
                              </>
                            );
                          })}
                        </ResultStationList>
                      </ResultStationListWrap>
                    </ListSearchLi>

                    <ListSearchLi>
                      <SearchInput2
                        type="text"
                        name="subway"
                        placeholder="도착지 입력"
                        value={inputKeywordArrivals}
                        onChange={onChangeArrivals}
                        onKeyup={clearInput}
                        onBlur={closedList}
                      />
                      <ResultStationListWrap
                        style={{
                          display:
                            searchResultData2 &&
                            inputKeywordArrivals.length >= 2
                              ? `inline-block`
                              : `none`,
                        }}
                      >
                        <ResultStationList>
                          {searchResultData2?.map((lineData, index) => {
                            return (
                              <>
                                <ResultStationItem
                                  key={index}
                                  onClick={SearchSubwayData}
                                >
                                  <StationNameSpan id="stationNameSpan">
                                    {lineData.stationName}&ensp;
                                  </StationNameSpan>
                                  <LineNumColor
                                    style={{
                                      data: SUBWAY_COLOR_NAME_DATA.filter(
                                        item => {
                                          const lineColor =
                                            item.lineName.indexOf(
                                              lineData.lineName
                                            ) > -1;

                                          if (lineColor) {
                                            return item.color;
                                          }
                                        }
                                      ),
                                    }}
                                  >
                                    &ensp;{lineData.lineName}&ensp;
                                  </LineNumColor>
                                </ResultStationItem>
                              </>
                            );
                          })}
                        </ResultStationList>
                      </ResultStationListWrap>
                    </ListSearchLi>
                  </ListSearchUl>
                </SeachBox>
              </SearchInputWarp>
            </SearchWarp>

            <SearchButton
              disabled={activeBtn ? '' : 'disabled'}
              handleActive={activeBtn}
              type="submit"
              onClick={submitData}
            >
              길찾기
            </SearchButton>
          </SearchSection>

          <ResultStationSection>
            <ResultPathListWrap>
              <div
                style={{
                  display: shortestData?.totalTime ? `block` : `none`,
                }}
              >
                <ResultTitle>빠른 경로</ResultTitle>
                <ResultPathList>
                  <ResultPathItem>
                    {/* {console.log(shortestData)} */}
                    <span style={{ fontSize: `25px`, color: `#333` }}>
                      {shortestData?.totalTime} 분{' '}
                    </span>
                    | 도보&nbsp;
                    {shortestData?.totalwalkTime} 분 | 약&nbsp;
                    {shortestData?.totalFee} 원
                  </ResultPathItem>
                  <ResultPathItem>
                    <TypePipeWrap
                      style={{
                        position: `relative`,
                        display: `flex`,
                        alignContent: `flex-start`,
                        justifyContent: `flex-start`,
                        alignItems: `center`,
                        flexDirection: `row`,
                        flexWrap: `wrap`,
                        width: `100%`,
                        height: `24px`,
                        backgroundColor: `#eee`,
                        borderRadius: `13px`,
                        lineHeight: `2.5`,
                      }}
                    >
                      {shortestData.detailPath?.map((StnData, index) => {
                        // console.log(StnData);
                        return (
                          <>
                            <div
                              key={index}
                              style={{ display: 'inline-block' }}
                            >
                              <div
                                style={{
                                  display:
                                    StnData['type'] === 'walk'
                                      ? `none`
                                      : `inline-block`,
                                  width: `35px`,
                                  verticalAlign: `bottom`,
                                }}
                              >
                                <div
                                  style={{
                                    display: `flex`,
                                    justifyContent: `center`,
                                    alignItems: `center`,
                                    width: `35px`,
                                    height: `35px`,
                                    padding: `6px 4px`,
                                    fontSize: `8px`,
                                    color: `#333`,
                                    lineHeight: `1`,
                                    textAlign: `center`,
                                    backgroundColor: `#fff`,
                                    border: `1px solid #555`,
                                    borderRadius: `50%`,
                                  }}
                                >
                                  {StnData['type'] === 'subway'
                                    ? `${StnData['startStation']}`
                                    : ''}
                                </div>
                              </div>
                              <TypePipe
                                style={{
                                  display:
                                    StnData['type'] !== `walk`
                                      ? `inline-block`
                                      : `none`,
                                }}
                                StnData={StnData}
                                shortestData={{ shortestData }}
                                color={{
                                  data: SUBWAY_COLOR_NAME_DATA.filter(item => {
                                    const lineColor1 =
                                      item.lineName.indexOf(
                                        StnData.vehicleinfo?.[0].name
                                      ) > -1;
                                    if (lineColor1) {
                                      return item.color;
                                    }
                                  }),
                                }}
                              >
                                {StnData['type'] === 'walk'
                                  ? ''
                                  : '' || StnData['type'] === 'subway'
                                  ? `${StnData['vehicleinfo'][0].name}`
                                  : ''}
                              </TypePipe>
                            </div>
                          </>
                        );
                      })}
                      <div
                        style={{
                          display: `flex`,
                          justifyContent: `center`,
                          alignItems: `center`,
                          width: `35px`,
                          height: `35px`,
                          padding: `6px 4px`,
                          fontSize: `8px`,
                          color: `#333`,
                          lineHeight: `1.5`,
                          backgroundColor: `#fff`,
                          border: `1px solid #555`,
                          borderRadius: `50%`,
                          textAlign: `center`,
                        }}
                      >
                        {/* {console.log(shortestData?.detailPath)} */}
                      </div>
                    </TypePipeWrap>
                  </ResultPathItem>
                </ResultPathList>
              </div>

              <div
                style={{
                  display: minTransferData?.totalTime ? `block` : `none`,
                }}
              >
                <ResultTitle>최소환승 경로</ResultTitle>
                <ResultPathList>
                  <ResultPathItem>
                    {/* {console.log(minTransferData)} */}
                    <span style={{ fontSize: `25px`, color: `#333` }}>
                      {minTransferData?.totalTime} 분
                    </span>{' '}
                    | 도보&nbsp;
                    {minTransferData?.totalwalkTime} 분 | 약&nbsp;
                    {minTransferData?.totalFee} 원
                  </ResultPathItem>
                  <ResultPathItem>
                    <TypePipeWrap
                      style={{
                        display: `inline-block`,
                        width: `100%`,
                        height: `24px`,
                        backgroundColor: `#eee`,
                        borderRadius: `13px`,
                        lineHeight: `1.5`,
                      }}
                    >
                      {minTransferData.detailPath?.map((StnData, index) => {
                        // console.log(StnData);
                        return (
                          <>
                            <TypePipe
                              key={index}
                              style={{
                                display: StnData ? `inline-block` : `none`,
                              }}
                              StnData={StnData}
                              minTransferData={minTransferData}
                              color={{
                                data: SUBWAY_COLOR_NAME_DATA.filter(item => {
                                  const lineColor1 =
                                    item.lineName.indexOf(
                                      StnData.vehicleinfo?.[0].name
                                    ) > -1;
                                  if (lineColor1) {
                                    return item.color;
                                  }
                                }),
                              }}
                            >
                              {StnData['type'] === 'walk'
                                ? ''
                                : '' || StnData['type'] === 'subway'
                                ? `${StnData['vehicleinfo'][0].name}`
                                : ''}
                            </TypePipe>
                          </>
                        );
                      })}
                    </TypePipeWrap>
                  </ResultPathItem>
                </ResultPathList>
              </div>
            </ResultPathListWrap>
          </ResultStationSection>
        </Aside>
        <SubwayMap />
      </SubwaySection>
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

const SubwaySection = styled.div`
  width: 100%;
  float: left;
`;

const Aside = styled.section`
  display: inline-block;
  position: relative;
  width: 360px;
  box-shadow: 1px 0 10px 0.5px #aaa;
  margin-left: 100px;

  animation-timing-function: ease-out;
  animation-name: ${props => (props.toggle ? fadeOut : fadeIn)};
  animation-fill-mode: forwards;
  float: left;
`;

const ToggleButton = styled.div`
  position: absolute;
  right: -28px;
  top: 50vh;
  width: 28px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  border-radius: 0px 8px 8px 0px;
  background-color: #fff;
  cursor: pointer;

  & > div {
    content: ${props =>
      props.toggle
        ? "url('/images/pathfinder/ic_fold.png')"
        : "url('/images/pathfinder/ic_unfold.png')"};
  }
`;

const ToggleImage = styled.div`
  //content: url(/images/pathfinder/ic_fold.png);
`;

const SearchSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 18vh;
  background-color: #fff;
`;

const SearchWarp = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 14vh;
`;

const ChangeButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 98px;
  margin-top: 28px;
  cursor: pointer;
`;

const SearchInputWarp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 98px;
  margin-top: 28px;
`;

const SeachBox = styled.div`
  width: 286px;
  font-size: 0;
  border: none;
  border-radius: 4px;
`;

const ListSearchUl = styled.ul``;

const ListSearchLi = styled.li`
  position: relative;
  border: none;

  &:nth-child(1) {
    margin-bottom: 10px;
  }
`;

const SearchInput1 = styled.input`
  position: relative;
  width: 286px;
  height: 40px;
  margin: 2px 0;
  padding: 5px 16px;
  font-size: 13px;
  color: #333;
  letter-spacing: -0.5px;
  background-color: inherit;
  border: 1px solid #aaa;
  border-radius: 4px;
  outline: none;
  ime-mode: active;

  &:focus {
    border: 1px solid #2fc863;
  }

  &:focus + div > ul {
    border: 1px solid #2fc863;
    border-top: 0;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    content: 'lll';
    font-size: 21px;
    width: 10px;
    height: 10px;
    z-index: 9999;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: url(/images/pathfinder/Round.png);
    width: 10px;
    height: 10px;
  }
`;

const SearchInput2 = styled.input`
  width: 286px;
  height: 40px;
  margin: 2px 0;
  padding: 5px 16px;
  font-size: 13px;
  color: #333;
  letter-spacing: -0.5px;
  background-color: inherit;
  border: 1px solid #aaa;
  border-radius: 4px;
  outline: none;
  ime-mode: active;

  &:focus {
    border: 1px solid #2fc863;
  }

  &:focus + div > ul {
    border: 1px solid #2fc863;
    border-top: 0;
  }
`;

const SearchButton = styled.button`
  width: 74px;
  height: 38px;
  margin-right: 18px;
  margin-bottom: 10px;
  color: white;
  background: #2fc863;
  border-radius: 4px;
  border: 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: default;
  }
`;

const ResultStationSection = styled.section`
  width: 100%;
  height: 82vh;
  padding: 20px 14px;
  background-color: #fff;
`;

const ResultStationListWrap = styled.div`
  position: absolute;
  top: 31px;
  right: -2px;
  width: 286px;
  margin: 2px;
  z-index: 9;
  display: none;
  z-index: 1;
`;

const ResultStationList = styled.ul`
  display: flex;
  justify-content: column;
  flex-wrap: wrap;
  width: 100%;
  min-height: 0px;
  padding: 4px 0;
  border: 1px solid #aaa;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
`;

const ResultStationItem = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2px 0;
  padding: 6px 10px 6px 15px;
  background-color: inherit;
`;

const ResultTitle = styled.h3`
  margin: 30px 0 20px;
  font-size: 17px;
`;

const TypePipeWrap = styled.div`
  margin: 10px 0;
`;

const TypePipe = styled.span`
  width: ${props => {
    if (props.shortestData) {
      // console.log(props.StnData, props.shortestData.shortestData.totalTransit);
      return (
        (props.StnData.sectionTime /
          props.shortestData?.shortestData.totalTime) *
        (320 - (props.shortestData.shortestData.totalTransit + 1) * 35)
      );
    } else if (props.minTransferData) {
      return Math.round(
        (props.StnData.sectionTime / props.minTransferData?.totalTime) * 320
      );
    } else {
      return;
    }
  }}px;

  height: 24px;
  padding: 4px 0px;
  font-size: 9px;
  color: #fff;
  line-height: 1.9;
  text-align: center;
  background-color: ${props => props.color.data[0]?.color};
  border-radius: 13px;
  overflow: hidden;
`;

const ResultPathListWrap = styled.div`
  margin: 2px;
`;

const ResultPathList = styled.div`
  margin: 2px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dfdfdf;
`;

const ResultPathItem = styled.div`
  margin: 2px;
  font-size: 15px;
  color: #afafaf;
`;

const StationNameSpan = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 1.9;
`;

const LineNumColor = styled.span`
  padding: 3px 5px;
  font-size: 11px;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px #333;
  line-height: 1.6;
  background-color: ${props => props.style.data[0].color};
  border-radius: 13px;
`;

const SubwayMap = styled.div`
  width: calc(100vw - 100px);
  min-width: calc(100vw - 100px);
  height: 100vh;
  margin-left: 100px;
  background-image: url(/images/SubwayMap.png);
  background-size: 1300px;
  background-repeat: no-repeat;
`;

export default Subway;
