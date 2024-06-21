import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext.jsx';
import { useSearchParams } from 'react-router-dom';
import { LoadingStatus } from '../../enums/index.js';

const Search = () => {
  const searchRef = useRef(null);
  const { setLoadingStatus, setPackages } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  useEffect(() => {
    // Focus the input upon initial render
    searchRef.current.focus();

    // Call API on initial render if searchValue exists
    // Example: user refreshes page or shares URL with existing value
    if (searchValue?.length) {
      searchPackages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchPackages() {
    // Only perform search if searchValue exists
    if (searchValue?.length) {
      setLoadingStatus(LoadingStatus.LOADING);
      // TODO: Link to API doc and verify API always returns a max of 25 results
      try {
        const response = await fetch(
          `https://api.npms.io/v2/search/suggestions?q=${searchValue}`
        );

        // TODO: Handle other status codes; Could implement retry logic upon failure
        // If request is successful, set package data in store & hide loader
        if (response.status === 200) {
          const packagesData = await response.json();
          // Double check we are receiving data in an array
          if (packagesData instanceof Array) {
            setPackages(packagesData);
            setLoadingStatus(LoadingStatus.SUCCESS);
            // TODO: Emit API success metric
          } else {
            // If data is returned in a different data structure, mark as failed and log
            handleSearchPackagesError();
          }
        } else {
          handleSearchPackagesError();
        }
      } catch (error) {
        handleSearchPackagesError();
      }
    }
  }

  // Handles error state by setting packages to empty array & setting error message
  function handleSearchPackagesError() {
    setPackages([]);
    setLoadingStatus(LoadingStatus.FAILED);
    // TODO: Log API failure with request & response
  }

  return (
    <SearchContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchLabel htmlFor="search-input">Search</SearchLabel>
        <SearchInput
          id="search-input"
          ref={searchRef}
          placeholder="Search packages"
          type="search"
          name="search"
          value={searchValue}
          onChange={(e) => {
            setSearchParams((prev) => {
              prev.set('q', e.target.value);
              return prev;
            });
          }}
        />
        <SearchButton disabled={!searchValue.length} onClick={searchPackages}>
          Search
        </SearchButton>
      </form>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchLabel = styled.label`
  position: absolute;
  overflow: hidden;
  margin: -1px;
  white-space: nowrap;
  border-width: 0;
  clip: rect(0, 0, 0, 0);
`;

const SearchInput = styled.input`
  padding: 1rem;
  height: 3rem;
  width: 32rem;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 1rem;
  height: 3rem;
  width: 8rem;
  border: none;
  background-color: #231f20;
  color: white;
  font-family: 'Poppins'
  font-size: 14px;
  font-weight: bold;
  letter-spacing: .3px;
  cursor: pointer;

  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;
