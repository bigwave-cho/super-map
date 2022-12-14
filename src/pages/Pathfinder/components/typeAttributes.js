export const transportationColor = info => {
  if (info.type === 'walk') return '#3399FF';

  if (info.type === 'subway') {
    if (info.lineId === '1') return '#1D2984';
    if (info.lineId === '2') return '#34AA39';
    if (info.lineId === '3') return '#FC5C08';
    if (info.lineId === '4') return '#278BD6';
    if (info.lineId === '5') return '#7412D8';
    if (info.lineId === '6') return '#A43C0C';
    if (info.lineId === '7') return '#566111';
    if (info.lineId === '8') return '#DC005B';
    if (info.lineId === '9') return '#C2952D';

    if (info.lineId === '21') return '#5D85C5';
    if (info.lineId === '22') return '#FDAA40';

    if (info.lineId === '100' || '116') return '#FEC629';
    if (info.lineId === '101') return '#5893C6';
    if (info.lineId === '102') return '#FC833F';
    if (info.lineId === '104') return '#02AD78';
    if (info.lineId === '107') return '#67BA5E';
    if (info.lineId === '108') return '#278955';
    if (info.lineId === '109') return '#950D25';
    if (info.lineId === '110') return '#FD8A1F';
    if (info.lineId === '111') return '#FEC629';
    if (info.lineId === '112') return '#206BEE';
    if (info.lineId === '113') return '#BAB706';
    if (info.lineId === '114') return '#7BBC31';
    if (info.lineId === '115') return '#96710A';
  }

  if (info.type === 'bus') {
    if (info.busrouteType === '1') return '#2CAA9F';
    if (info.busrouteType === '2') return '#F85555';
    if (info.busrouteType === '3') return '#92D050';
    if (info.busrouteType === '4') return '#F85555';
    if (info.busrouteType === '5') return '#74A4CE';
    if (info.busrouteType === '6') return '#F85555';
    if (info.busrouteType === '10') return '#59B5B5';
    if (info.busrouteType === '11') return '#5C6DEC';
    if (info.busrouteType === '12') return '#66C056';
    if (info.busrouteType === '13') return '#F5BD40';
    if (info.busrouteType === '14') return '#F85555';
    if (info.busrouteType === '15') return '#F85555';
    if (info.busrouteType === '26') return '#7F45CA';
    if (info.busrouteType === '122') return '#8F106D';
  }
};

export const subwayName = lineId => {
  if (lineId === '21') return '?????? 1';
  if (lineId === '22') return '?????? 2';
  if (lineId === '31') return '?????? 1';
  if (lineId === '41') return '?????? 1';
  if (lineId === '42') return '?????? 2';
  if (lineId === '43') return '?????? 3';
  if (lineId === '51') return '?????? 1';
  if (lineId === '71') return '?????? 1';
  if (lineId === '72') return '?????? 2';
  if (lineId === '73') return '?????? 3';
  if (lineId === '74') return '?????? 4';
  if (lineId === '78') return '?????? ??????????????????';
  if (lineId === '79') return '?????? ?????????';

  if (lineId === '100' || '116') return '?????????';
  if (lineId === '101') return '????????????';
  if (lineId === '102') return '??????MF';
  if (lineId === '104') return '???????????????';
  if (lineId === '107') return '????????????';
  if (lineId === '108') return '?????????';
  if (lineId === '109') return '????????????';
  if (lineId === '110') return '?????????';
  if (lineId === '111') return '???????????????';
  if (lineId === '112') return '?????????';
  if (lineId === '113') return '????????????';
  if (lineId === '114') return '??????????????????';
  if (lineId === '115') return '??????';
};
