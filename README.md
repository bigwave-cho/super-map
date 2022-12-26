# 기업협업 - Super Move

### Skill

: Javascript(React.js), styled component, Naver map api, Git(bitbucket),RESTful API,

### 협업툴

: Notion, Slack, Git(bitbucket), Source tree, Figma

### 과제 목적

- 지도 기반 모빌리티 데이터 시각화
  - 통합 길찾기 경로 검색 기능
  - 대중교통 데이터 시각화(버스, 정류장, 지하철 정보)
- Naver Map API를 이용한 기능 구현
- 실제 서비스 중인 서버 API를 이용

### 🗓 수행 기간

> 2022.10.17 - 2022.11.10(4주)

### 시연 영상
- <a href="https://www.youtube.com/watch?v=PdC57-63zfI">시연 영상 보러가기</a>

<br />

## 📚 목차

- [팀 정보](#팀-정보)
- [담당 페이지 및 구현 기능](#담당-페이지-및-구현-기능)
- [실행 방법](#실행-방법)
- [디렉토리 구조](#디렉토리-구조)

<br />

## 팀 정보

- 위코드 부트캠프 프론트엔드 과정 수료자 3명

### Members

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/bigwave-cho">
                <img src="https://avatars.githubusercontent.com/u/105909665?s=400&u=c9238dcf8eee09f59c3e123b9bd53b9056637286&v=4" width="100px;" alt="조재현"/>
                <br />
                <sub>
                    <b>조재현</b>
                </sub>
            </a>
            <br />
        </td>
        <td align="center">
            <a href="https://github.com/smash009">
                <img src="https://avatars.githubusercontent.com/u/46629029?v=4" width="100px;" alt="남장현"/>
                <br />
                <sub>
                    <b>남장현</b>
                </sub>
            </a>
            <br />
        </td>
        <td align="center">
            <a href="https://github.com/kwakhyun">
                <img src="https://avatars.githubusercontent.com/u/97573525?v=4" width="100px;" alt="안나라"/>
                <br />
                <sub>
                    <b>안나라</b>
                </sub>
            </a>
            <br />
        </td>               
    </tr>
</table>


<br />

## 담당 페이지 및 구현 기능

![part2](https://user-images.githubusercontent.com/105909665/209518834-1a1c70c8-cbb1-449a-81aa-e844c030bb2e.gif)
![part3](https://user-images.githubusercontent.com/105909665/209518977-8e1eea1f-adb0-4acc-b284-fd733238663d.gif)

## 실행 방법

해당 프로젝트를 로컬서버에서 실행하기 위해서는 Git 과 Npm (node.js를 포함) 이 설치되어 있어야 합니다.

1. 레파지토리 클론

   ```
   git clone https://github.com/bigwave-cho/super-map.git
   ```

2. packages 설치

   ```
   npm install
   ```

3. 실행

   ```
   npm start
   ```

<br />

## 디렉토리 구조

<details>
    <summary>Repository Overview</summary>
    <div>
 
```zsh
src
 ┣ components
 ┃ ┣ MenuList
 ┃ ┃ ┗ MenuListData.js
 ┃ ┣ Map.js
 ┃ ┣ Nav.js
 ┃ ┗ NavListWrap.js
 ┣ pages
 ┃ ┣ Bus
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ button
 ┃ ┃ ┃ ┃ ┣ CancelButton.js
 ┃ ┃ ┃ ┃ ┗ FoldButton.js
 ┃ ┃ ┃ ┣ route
 ┃ ┃ ┃ ┃ ┣ BusRoute.js
 ┃ ┃ ┃ ┃ ┗ BusRouteInfo.js
 ┃ ┃ ┃ ┣ search
 ┃ ┃ ┃ ┃ ┣ BusNumber.js
 ┃ ┃ ┃ ┃ ┣ BusSearch.js
 ┃ ┃ ┃ ┃ ┣ BusSearchResult.js
 ┃ ┃ ┃ ┃ ┗ BusStation.js
 ┃ ┃ ┃ ┗ station
 ┃ ┃ ┃ ┃ ┣ BusArrival.js
 ┃ ┃ ┃ ┃ ┗ BusStationInfo.js
 ┃ ┃ ┣ data
 ┃ ┃ ┃ ┗ busType.js
 ┃ ┃ ┣ images
 ┃ ┃ ┃ ┣ busroute_01.svg
 ┃ ┃ ┃ ┣ busroute_02.svg
 ┃ ┃ ┃ ┣ busroute_03.svg
 ┃ ┃ ┃ ┣ map-realtimebus-icon.svg
 ┃ ┃ ┃ ┣ realtime-button.svg
 ┃ ┃ ┃ ┗ refresh.svg
 ┃ ┃ ┣ Bus.js
 ┃ ┃ ┗ MapBus.js
 ┃ ┣ Pathfinder
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ Search.js
 ┃ ┃ ┃ ┣ SearchList.js
 ┃ ┃ ┃ ┣ SearchPath.js
 ┃ ┃ ┃ ┗ typeAttributes.js
 ┃ ┃ ┣ images
 ┃ ┃ ┃ ┣ ic_bus_!8x18.svg
 ┃ ┃ ┃ ┗ ic_subway_18x18.svg
 ┃ ┃ ┣ PathFinder.js
 ┃ ┃ ┗ store.js
 ┃ ┗ Subway
 ┃ ┃ ┣ SUBWAY_COLOR_NAME_DATA.js
 ┃ ┃ ┗ Subway.js
 ┣ styles
 ┃ ┣ GlobalStyle.js
 ┃ ┣ theme.js
 ┃ ┗ variable.js
 ┣ Main.js
 ┣ Router.js
 ┗ index.js
```
</details>
