import { createContext, useContext, useState } from 'react';
import { LoadingStatus } from '../enums/index';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.INITIAL);
  const [packages, setPackages] = useState([]);

  return (
    <DataContext.Provider
      value={{ packages, setPackages, loadingStatus, setLoadingStatus }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
