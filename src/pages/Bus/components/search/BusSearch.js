import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

const BusSearch = ({
  anchor,
  handleChange,
  selectedValue,
  handleClose,
  searchClickHandler,
  handleSubmit,
  options,
}) => {
  const open = Boolean(anchor);
  return (
    <Search>
      <form onSubmit={handleSubmit}>
        <SearchContainer>
          <div />
          <SearchInput
            placeholder="버스 또는 정류장을 검색해 보세요"
            value={open ? anchor : selectedValue}
            maxLength="20"
            onChange={handleChange}
          />
        </SearchContainer>
        <Paper
          sx={{
            width: '324px',
            position: 'absolute',
            top: 68,
            zIndex: '100',
            display: !open && 'none',
          }}
          anchor={anchor}
          onClose={handleClose}
        >
          {options?.map(
            (option, index) =>
              index < 5 && (
                <MenuItem key={option + index} onClick={searchClickHandler}>
                  {option.stationName}
                  {option.busNo}
                </MenuItem>
              )
          )}
        </Paper>
      </form>
    </Search>
  );
};

const Search = styled.div`
  ${({ theme }) => theme.variables.flex('column')}
  padding: 28px 0;
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
`;

const SearchContainer = styled.div`
  ${({ theme }) => theme.variables.flex('', 'flex-start')}
  padding-left: 13px;
  width: 324px;
  height: 40px;
  background: #fefefe;
  border: 1px solid #9e9e9e;
  border-radius: 4px;

  div {
    margin-right: 8px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #9e9e9e;
  }

  &:focus-within {
    border: 1px solid #2fc863;

    div {
      background-color: #2fc863;
    }
  }
`;

const SearchInput = styled.input`
  width: 215px;
  height: 19px;
  outline: none;
  border-style: none;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

export default BusSearch;
