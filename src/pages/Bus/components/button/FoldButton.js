import React from 'react';
import styled from 'styled-components';

const FoldButton = ({ toggle, toggleFinder }) => {
  return (
    <>
      <ToggleBtn toggle={toggle} onClick={toggleFinder}>
        <img alt="toggle" />
      </ToggleBtn>
    </>
  );
};

const ToggleBtn = styled.div`
  position: absolute;
  right: -28px;
  top: 50vh;
  width: 28px;
  height: 56px;
  ${({ theme }) => theme.variables.flex('')}
  z-index: 100;
  border: 1px solid #dbdbdb;
  border-radius: 0px 8px 8px 0px;
  background-color: #ffffff;

  img {
    content: ${props =>
      props.toggle
        ? "url('/images/pathfinder/ic_fold.png')"
        : "url('/images/pathfinder/ic_unfold.png')"};
  }

  &:hover {
    cursor: pointer;
  }
`;

export default FoldButton;
