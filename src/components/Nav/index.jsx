import React from 'react';
import styled from 'styled-components';
import Search from '../Search/index';

const Nav = () => {
  return (
    <Header>
      {/* Placeholder for other header / nav items */}
      <Search />
      {/* Placeholder for other header / nav items */}
    </Header>
  );
};

export default Nav;

const Header = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
