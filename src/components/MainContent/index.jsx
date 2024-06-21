import React from 'react';
import { useData } from '../../contexts/DataContext.jsx';
import styled from 'styled-components';
import { LoadingStatus } from '../../enums/index.js';

const MainContent = () => {
  const { loadingStatus, packages } = useData();

  // When loading status is loading, display loader
  if (loadingStatus === LoadingStatus.LOADING) {
    // TODO: Replace with graphical loader
    return <Loader>Loading...</Loader>;
  }

  // If API fails, display error message
  if (loadingStatus === LoadingStatus.FAILED) {
    return (
      // TODO: Replace with i18n error message
      <ErrorMessage>
        Uh oh! Sorry about that! Displaying a detailed and sympathetic error
        message to the user
      </ErrorMessage>
    );
  }

  return (
    <MainContainer>
      {/* Display message when request has been made and no packages are found */}
      {loadingStatus !== LoadingStatus.INITIAL && !packages?.length ? (
        <InfoMessage>No packages found</InfoMessage>
      ) : (
        packages.map((item, index) => {
          return (
            <PackageItem key={`${item.package.name}-${index}`}>
              <PackageItemLink href={item.package.links.npm}>
                <PackageItemName>{item.package.name}</PackageItemName>
              </PackageItemLink>
              <PackageItemDescription>
                {item.package.description}
              </PackageItemDescription>
            </PackageItem>
          );
        })
      )}
    </MainContainer>
  );
};

export default MainContent;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;

const PackageItem = styled.section`
  display: flex;
  flex-direction: column;
  width: 630px;
  border-bottom: 1px solid black;
  margin-top: 1rem;
`;

const PackageItemLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PackageItemName = styled.h3`
  color: #231f20;
  font-size: 1.25rem;
  text-decoration: none;
  padding: 0;
  margin: 0;
`;

const PackageItemDescription = styled.p`
  color: #00000099;
  font-size: 1rem;
`;

const Loader = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
`;

const InfoMessage = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
`;

const ErrorMessage = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
  color: red;
`;
