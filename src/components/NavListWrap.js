import React from 'react';
import { NavLink } from 'react-router-dom';
import MENU_LIST from './MenuList/MenuListData';
import styled from 'styled-components';

const NavList = styled.ul`
  width: 100%;
  margin: 0px 0;
  padding: 0px 0;
`;

const NavItem = styled.li`
  display: block;
  width: 100%;
  height: 100px;
  line-height: 1.5;
  margin: 0px 0;
  text-align: center;
  text-decoration: none;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s;

  &:nth-child(1) {
    border-bottom: 1px solid #474747;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: 0.2s;

    &::after {
      content: '';
      position: relative;
      bottom: 3px;
      display: block;
      border-bottom: 5px solid #777;
      box-sizing: content-box;
      border-radius: 3px;
    }
  }

  & > a.active {
    & {
      background-color: rgba(253, 251, 251, 0.2);
      transition: 0.2s;
    }

    &::after {
      content: '';
      position: relative;
      bottom: -30px;
      display: block;
      border-bottom: 5px solid #666;
      box-sizing: content-box;
      border-radius: 3px;
      transition: 0.2s;
    }
  }
`;

const NavLinkTag = styled(NavLink)`
  display: block;
  width: 100%;
  height: 100px;
  padding: 36px 0;
  text-decoration: none;
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 1px;
`;

const NavListWrap = () => {
  return (
    <NavList>
      {MENU_LIST.map(list => {
        return (
          <NavItem key={list.id}>
            <NavLinkTag to={list.to} end={list.end}>
              {list.item}
            </NavLinkTag>
          </NavItem>
        );
      })}
    </NavList>
  );
};

export default NavListWrap;
