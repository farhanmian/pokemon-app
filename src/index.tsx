import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PokemonDetails from './components/app/PokemonDetails/PokemonDetails';
import Nav from './components/Layout/Nav/Nav';

const App = React.lazy(() => import('./App'));

const Component: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return <>
    <Nav />
    {element}
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Component element={<App />} />,
  },
  {
    path: "/:name",
    element: <Component element={<PokemonDetails />} />,
  },
  {
    path: "/:name/:id",
    element: <Component element={<PokemonDetails />} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


