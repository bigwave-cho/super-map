import React from 'react';
import styled from 'styled-components';

const CancelButton = () => {
  return (
    <div>
      <Cancel href="/bus">
        <img alt="cancel-button" />
      </Cancel>
    </div>
  );
};

const Cancel = styled.a`
  position: absolute;
  right: -40px;
  top: 3vh;
  width: 40px;
  height: 40px;
  ${({ theme }) => theme.variables.flex()}
  z-index: 100;
  border: 1px solid #dbdbdb;
  border-radius: 0px 8px 8px 0px;
  background-color: #ffffff;

  img {
    content: url('/images/bus/cancel.svg');
  }
`;

export default CancelButton;
