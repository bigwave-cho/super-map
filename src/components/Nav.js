import React from 'react';
import NavListWrap from './NavListWrap';
import styled from 'styled-components';

const Nav = () => {
  return (
    <NavWrap>
      <LogoWrap className="logoWrap">
        <Logo src="/images/logo_s.png" alt="Logo" />
      </LogoWrap>
      <NavListWrap className="navList" />
    </NavWrap>
  );
};

const NavWrap = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100vh;
  background-color: #212121;
  z-index: 9;
`;

const LogoWrap = styled.h1`
  width: 100%;
  height: 100px;
  padding: 29px 30px;
  border-bottom: 1px solid #474747;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

export default Nav;
