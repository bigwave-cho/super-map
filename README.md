
# ๊ธฐ์ํ์ - Super Move

## ๐ ๋ชฉ์ฐจ

- [๊ฐ์](#๊ฐ์)
- [๊ณผ์  ๋ด์ฉ](#๊ณผ์ -๋ด์ฉ)
- [ํ ์ ๋ณด](#ํ-์ ๋ณด)
- [๋ด๋น ํ์ด์ง ๋ฐ ๊ตฌํ ๊ธฐ๋ฅ](#๋ด๋น-ํ์ด์ง-๋ฐ-๊ตฌํ-๊ธฐ๋ฅ)
- [์คํ ๋ฐฉ๋ฒ](#์คํ-๋ฐฉ๋ฒ)
- [๋๋ ํ ๋ฆฌ ๊ตฌ์กฐ](#๋๋ ํ ๋ฆฌ-๊ตฌ์กฐ)


## ๊ฐ์

### ๐ ์ํ ๊ธฐ๊ฐ

> 2022.10.17 - 2022.11.10(4์ฃผ)

### ๐ผ Skill

: Javascript(React.js), styled component</br> Naver map api, Git(bitbucket), RESTful API

### ๐ผ ํ์ํด

: Notion, Slack, Git(bitbucket), Source tree, Figma

## โ๏ธ๊ณผ์  ๋ด์ฉ
- ์ง๋ ๊ธฐ๋ฐ ๋ชจ๋น๋ฆฌํฐ ๋ฐ์ดํฐ ์๊ฐํ
  - ํตํฉ ๊ธธ์ฐพ๊ธฐ ๊ฒฝ๋ก ๊ฒ์ ๊ธฐ๋ฅ
  - ๋์ค๊ตํต ๋ฐ์ดํฐ ์๊ฐํ(๋ฒ์ค, ์ ๋ฅ์ฅ, ์งํ์ฒ  ์ ๋ณด)
- Naver Map API๋ฅผ ์ด์ฉํ ๊ธฐ๋ฅ ๊ตฌํ
- ์ค์  ์๋น์ค ์ค์ธ ์๋ฒ API๋ฅผ ์ด์ฉ





<br />



<br />

## ํ ์ ๋ณด

- ์์ฝ๋ ๋ถํธ์บ ํ ํ๋ก ํธ์๋ ๊ณผ์  ์๋ฃ์ 3๋ช

### Members

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/bigwave-cho">
                <img src="https://avatars.githubusercontent.com/u/105909665?s=400&u=c9238dcf8eee09f59c3e123b9bd53b9056637286&v=4" width="100px;" alt="์กฐ์ฌํ"/>
                <br />
                <sub>
                    <b>์กฐ์ฌํ</b>
                </sub>
            </a>
            <br />
        </td>
        <td align="center">
            <a href="https://github.com/smash009">
                <img src="https://avatars.githubusercontent.com/u/46629029?v=4" width="100px;" alt="๋จ์ฅํ"/>
                <br />
                <sub>
                    <b>๋จ์ฅํ</b>
                </sub>
            </a>
            <br />
        </td>
        <td align="center">
            <a href="https://github.com/kwakhyun">
                <img src="https://avatars.githubusercontent.com/u/97573525?v=4" width="100px;" alt="์๋๋ผ"/>
                <br />
                <sub>
                    <b>์๋๋ผ</b>
                </sub>
            </a>
            <br />
        </td>               
    </tr>
</table>


<br />

## ๋ด๋น ํ์ด์ง ๋ฐ ๊ตฌํ ๊ธฐ๋ฅ

![part2](https://user-images.githubusercontent.com/105909665/209518834-1a1c70c8-cbb1-449a-81aa-e844c030bb2e.gif)
![part3](https://user-images.githubusercontent.com/105909665/209518977-8e1eea1f-adb0-4acc-b284-fd733238663d.gif)

### 1. ์ฃผ์ ๊ฒ์ ๊ธฐ๋ฅ
- ์ถ & ๋์ฐฉ ๋ฐ์ค์ focus ์ฌ๋ถ์ ๋ฐ๋ผ ๊ฒ์ state์ ์ถ&๋์ฐฉ ํ๋กํผํฐ์</br>
์ ํ์ ์ผ๋ก ์๋ ฅ๋๋๋ก ๊ตฌํ.
- ํค ์๋ ฅ ์ ์์ฝ ๋ฆฌ์คํธ๊ฐ ๋์ค๊ฒ ๊ตฌํ
- ๋งค ํค ์๋ ฅ์ ๋ง๋ค ์์ฝ ๋ฆฌ์คํธ ์์ฒญ์ ํธ๋ํฝ ์ฆ๊ฐ์ ์์ธ์ผ๋ก</br>
debounce๋ฅผ ์ฌ์ฉํ์ฌ ์ผ์  ์๋ ฅ ์๊ฐ์ด ์ง๋์ผ ์์ฒญ์ ๋ณด๋ด๋๋ก ๊ตฌํ.
- reverse ๋ฒํผ ์ถ&๋์ฐฉ์ง ๋ฐ๊พธ๊ธฐ๊ฐ ๊ฐ๋ฅํจ.

### 2. ๊ธธ์ฐพ๊ธฐ ๊ฒฐ๊ณผ ํ์ดํ๋ผ์ธ์ผ๋ก ํํ
- ๊ธธ์ฐพ๊ธฐ ๊ฒฐ๊ณผ ๋ถ๋ฌ์จ ๋ฐ์ดํฐ๋ฅผ ์ด์ฉํ์ฌ ๊ฐ ์์์๊ฐ ๋ณ๋ก ๋๋น ๋น์จ์</br>
๋ถ์ฌํ์ฌ ๊ตํต์๋จ ๋ณ ๊ณ ์  ์์ผ๋ก ํ์ดํ ๋ผ์ธ์ ๋ํ๋.

### 3. ์ง๋์ ์ถ&๋์ฐฉ ๋ง์ปค ๋ฐ ๊ฒฝ๋ก ํ์
- ๊ธธ์ฐพ๊ธฐ ์ ๊ฐ์ฅ ์ฐ์ ์์ ๊ฒฝ๋ก๊ฐ ์ง๋์ ํ์๋จ.
- ๊ฒฝ๋ก ๋ณ ํด๋ฆญ์ ํ๊ฒ ๋๋ฉด ํด๋น๋๋ ๊ฒฝ๋ก๊ฐ ์ง๋์ ํ์๋จ.
- ์ง๋์์๋ ๊ฐ ์๋จ ์ ๋ณด ์ฐฝ์ด ํ์๋๋ฉฐ ๋ํ ์ถ&๋์ฐฉ ๋ง์ปค๋ฅผ dragํ์ฌ</br>
์ถ&๋์ฐฉ์ง๋ฅผ ์์  ๊ฒ์ํ  ์ ์์.

## ์คํ ๋ฐฉ๋ฒ

ํด๋น ํ๋ก์ ํธ๋ฅผ ๋ก์ปฌ์๋ฒ์์ ์คํํ๊ธฐ ์ํด์๋ Git ๊ณผ Npm (node.js๋ฅผ ํฌํจ) ์ด ์ค์น๋์ด ์์ด์ผ ํฉ๋๋ค.

1. ๋ ํ์งํ ๋ฆฌ ํด๋ก 

   ```
   git clone https://github.com/bigwave-cho/super-map.git
   ```

2. packages ์ค์น

   ```
   npm install
   ```

3. ์คํ

   ```
   npm start
   ```

<br />

## ๋๋ ํ ๋ฆฌ ๊ตฌ์กฐ

<details>
    <summary>Repository Overview</summary>
    <div>
 
```zsh
src
 โฃ components
 โ โฃ MenuList
 โ โ โ MenuListData.js
 โ โฃ Map.js
 โ โฃ Nav.js
 โ โ NavListWrap.js
 โฃ pages
 โ โฃ Bus
 โ โ โฃ components
 โ โ โ โฃ button
 โ โ โ โ โฃ CancelButton.js
 โ โ โ โ โ FoldButton.js
 โ โ โ โฃ route
 โ โ โ โ โฃ BusRoute.js
 โ โ โ โ โ BusRouteInfo.js
 โ โ โ โฃ search
 โ โ โ โ โฃ BusNumber.js
 โ โ โ โ โฃ BusSearch.js
 โ โ โ โ โฃ BusSearchResult.js
 โ โ โ โ โ BusStation.js
 โ โ โ โ station
 โ โ โ โ โฃ BusArrival.js
 โ โ โ โ โ BusStationInfo.js
 โ โ โฃ data
 โ โ โ โ busType.js
 โ โ โฃ images
 โ โ โ โฃ busroute_01.svg
 โ โ โ โฃ busroute_02.svg
 โ โ โ โฃ busroute_03.svg
 โ โ โ โฃ map-realtimebus-icon.svg
 โ โ โ โฃ realtime-button.svg
 โ โ โ โ refresh.svg
 โ โ โฃ Bus.js
 โ โ โ MapBus.js
 โ โฃ Pathfinder
 โ โ โฃ components
 โ โ โ โฃ Map.js
 โ โ โ โฃ Search.js
 โ โ โ โฃ SearchList.js
 โ โ โ โฃ SearchPath.js
 โ โ โ โ typeAttributes.js
 โ โ โฃ images
 โ โ โ โฃ ic_bus_!8x18.svg
 โ โ โ โ ic_subway_18x18.svg
 โ โ โฃ PathFinder.js
 โ โ โ store.js
 โ โ Subway
 โ โ โฃ SUBWAY_COLOR_NAME_DATA.js
 โ โ โ Subway.js
 โฃ styles
 โ โฃ GlobalStyle.js
 โ โฃ theme.js
 โ โ variable.js
 โฃ Main.js
 โฃ Router.js
 โ index.js
```
</details>
