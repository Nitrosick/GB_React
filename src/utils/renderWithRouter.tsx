import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';

interface RenderParams {
  element: JSX.Element;
  pathForRoute: string;
  url: string;
}

type RenderWithRouter = (params: RenderParams) => void;

export const renderWithRouter: RenderWithRouter = ({
  element,
  pathForRoute,
  url,
}) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path={pathForRoute} element={element} />
      </Routes>
    </MemoryRouter>
  );
