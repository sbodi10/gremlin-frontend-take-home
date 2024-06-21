import React from 'react';
import styled from 'styled-components';
import Nav from '../Nav/index';
import MainContent from '../MainContent/index';

const Container = () => {
  return (
    <Wrapper>
      <Nav />
      <MainContent />
    </Wrapper>
  );
};

export default Container;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
