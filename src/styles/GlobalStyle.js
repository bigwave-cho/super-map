import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
 ${reset}
 * { 
    box-sizing: border-box;
 }

 body {
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  a {
   text-decoration: none;
   cursor: pointer;
  }
 }
 `;

export default GlobalStyle;
