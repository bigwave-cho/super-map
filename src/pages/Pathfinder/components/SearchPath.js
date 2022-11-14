import React from 'react';
import styled from 'styled-components';
import { transportationColor } from './typeAttributes';

const SearchPath = ({ PathData, setSelectDetail }) => {
  const handleClickPath = e => {
    setSelectDetail(e.currentTarget.dataset.index);
  };

  return (
    <PathLists>
      {PathData &&
        PathData.map((ele, i) => {
          return (
            <li
              onClick={handleClickPath}
              data-startlng={ele.startLng}
              data-startlat={ele.startLat}
              data-lastlng={ele.lastLng}
              data-lastlat={ele.lastLat}
              data-route={ele.routeAll}
              key={ele.routeAll}
              data-index={i}
            >
              <RouteSummaryBox>
                <span className="totalTime">
                  <span className="totalMin">
                    {parseInt(ele.totalTime / 60) !== 0 &&
                      parseInt(ele.totalTime / 60)}
                  </span>
                  <span className="timeUnit">
                    {parseInt(ele.totalTime / 60) !== 0 && '시간'}
                  </span>
                  <span className="totalMin">{ele.totalTime % 60}</span>
                  <span className="timeUnit">분</span>
                </span>
                <span className="divider">|</span>
                <span>
                  <span className="totalWalkTime">
                    도보 <span>{ele.totalwalkTime}</span>분
                  </span>
                </span>
                <span className="divider">|</span>
                <span className="totalFee">
                  약 {ele.totalFee.toLocaleString()}원
                </span>
              </RouteSummaryBox>
              <TimeLine>
                <WalkIcon>
                  <img alt="walkIcon" />
                </WalkIcon>
                {ele.detailPath.map((e, i) => {
                  return (
                    <TimeLineItem
                      style={{
                        width: `${(e.sectionTime / ele.totalTime) * 100}%`,
                      }}
                      key={e.order + String(i)}
                      primary={e}
                    >
                      {e.type !== 'walk' && (
                        <img alt="transportation-icon"></img>
                      )}
                      {!e.vehicleinfo && (
                        <div>
                          <span>{e.type !== 'walk' ? e.type : null}</span>
                        </div>
                      )}
                      {e.vehicleinfo && e.vehicleinfo[0].name ? (
                        <div>
                          <span>
                            {e.vehicleinfo[0].name.length >= 6
                              ? e.vehicleinfo[0].name.slice(
                                  e.vehicleinfo[0].name.indexOf('수도권') + 4
                                )
                              : e.vehicleinfo[0].name}
                          </span>
                        </div>
                      ) : null}
                      {e.vehicleinfo && e.vehicleinfo[0].busNo ? (
                        <div>
                          <span>{`${
                            e.vehicleinfo[0].busNo.length >= 5
                              ? e.vehicleinfo[0].busNo.slice(-4)
                              : e.vehicleinfo[0].busNo
                          }`}</span>
                        </div>
                      ) : null}
                    </TimeLineItem>
                  );
                })}
              </TimeLine>
              <TimeLineSub>
                <div className="totalWalkTime">
                  <span>{ele.totalwalkTime}</span>분
                </div>
                {ele.detailPath.map((e, i) => {
                  return (
                    <TimeLineSubItem
                      primary={e}
                      style={{
                        width: `${(e.sectionTime / ele.totalTime) * 100}%`,
                      }}
                      key={e.order}
                    >
                      {e.type !== 'walk' ? (
                        <div>
                          <span>{e.sectionTime}</span>분
                        </div>
                      ) : null}
                    </TimeLineSubItem>
                  );
                })}
              </TimeLineSub>
            </li>
          );
        })}
    </PathLists>
  );
};

const PathLists = styled.ul`
  position: relative;
  height: calc(100vh - 180px);
  background-color: white;
  overflow: scroll;

  li {
    position: relative;
    padding-bottom: 12px;
    border: 1px solid #e8e8e8;

    &:hover {
      background-color: #f0f7ff;
    }
  }
`;

const WalkIcon = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  ${({ theme }) => theme.variables.flex()}

  border-radius: 50%;
  background-color: #c4c4c4;

  img {
    width: 14px;
    height: 14px;

    content: url('/images/pathfinder/mobility_directionswalk.png');
  }
`;

const RouteSummaryBox = styled.div`
  ${({ theme }) => theme.variables.flex('', '', 'center')}

  position: relative;
  left: 19px;
  width: 360px;
  height: 42px;
  margin-top: 10px;
  margin-bottom: 10px;

  .totalTime,
  .divider,
  .totalWalkTime,
  .totalFee {
    margin-right: 6px;
  }
  .divider {
    font-size: 8px;
    color: lightgray;
  }

  .totalTime {
    ${({ theme }) => theme.variables.flex('', '', 'flex-end')}

    height: 22px;

    .timeUnit {
      padding-bottom: 3px;
      margin-right: 5px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;

      color: #494949;
    }

    .totalMin {
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 100%;
    }
  }

  .totalWalkTime,
  .totalFee {
    font-size: 12px;
    color: #494949;
  }
`;

const TimeLine = styled.div`
  ${props => props.theme.variables.flex('', 'flex-start')}
  position: relative;
  left: 18px;
  width: 324px;
  height: 22px;
  border-radius: 13px;
  background-color: #e8e8e8;
`;

const TimeLineItem = styled.div`
  position: relative;
  left: 5px;
  height: 22px;
  ${({ theme }) => theme.variables.flex()}
  min-width: ${props => (props.primary.type === 'walk' ? '12px;' : '44px;')};

  border-radius: 13px;
  background-color: ${props => {
    if (!props.primary) {
      return;
    }

    if (props.primary.type === 'subway') {
      const subwayInfo = {
        type: 'subway',
        lineId: String(props.primary.vehicleinfo[0].subwayCode),
      };
      return transportationColor(subwayInfo);
    }

    if (props.primary.type === 'bus') {
      const busInfo = {
        type: 'bus',
        busrouteType: String(props.primary.vehicleinfo[0].type),
      };
      return transportationColor(busInfo);
    }
  }};

  img {
    position: absolute;
    left: 2.5px;
    width: 13px;
    height: 13px;

    content: ${props => {
      if (!props.primary) {
        return;
      }

      if (props.primary.type === 'subway')
        return "url('/images/pathfinder/subwayIcon.png')";
      if (props.primary.type === 'bus')
        return "url('/images/pathfinder/ic_bus_!8x18.svg')";
    }};
  }

  span {
    position: relative;
    left: 3px;
    font-family: 700;
    font-size: 10px;
    color: white;
    z-index: 10;
  }
`;

const TimeLineSub = styled.div`
  ${props => props.theme.variables.flex('', 'flex-start')}
  position: relative;
  left: 19px;
  width: 324px;
  height: 22px;
  border-radius: 13px;

  .totalWalkTime {
    position: absolute;
    width: 25px;
    font-size: 10px;
    color: #c4c4c4;

    span {
      font-size: 12px;
    }
  }
`;

const TimeLineSubItem = styled(TimeLineItem)`
  justify-content: center;
  background-color: rgba(255, 255, 255, 0);
  color: ${props => {
    if (!props.primary.vehicleinfo) {
      return;
    }

    if (props.primary.type === 'subway') {
      const subwayInfo = {
        type: 'subway',
        lineId: String(props.primary.vehicleinfo[0].subwayCode),
      };

      return transportationColor(subwayInfo) + ';';
    }

    if (props.primary.type === 'bus') {
      const busInfo = {
        type: 'bus',
        busrouteType: String(props.primary.vehicleinfo[0].type),
      };
      return transportationColor(busInfo) + ';';
    }
  }};

  div {
    height: 16px;
    font-size: 10px;
  }

  span {
    font-size: 12px;
    left: 0px;
    color: ${props => {
      if (!props.primary.vehicleinfo) {
        return;
      }
      if (props.primary.type === 'subway') {
        const subwayInfo = {
          type: 'subway',
          lineId: String(props.primary.vehicleinfo[0].subwayCode),
        };
        return transportationColor(subwayInfo) + ';';
      }
      if (props.primary.type === 'bus') {
        const busInfo = {
          type: 'bus',
          busrouteType: String(props.primary.vehicleinfo[0].type),
        };
        return transportationColor(busInfo) + ';';
      }
    }};
  }
`;

export default SearchPath;
