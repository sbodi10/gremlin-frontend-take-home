import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import Container from './components/Container';

const App = () => {
  return (
    <DataProvider>
      <Container />
    </DataProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} />
    // Other routes...
  )
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
