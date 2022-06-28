import { FC, useState, Suspense } from 'react';
import { AppRouter } from './components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext, defaultContext } from 'src/utils/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import { Provider } from 'react-redux';
import { store } from './store';

export const App: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeContext.Provider
            value={{
              theme,
              toggleTheme,
            }}
          >
            <BrowserRouter>
              <AppRouter toggle={toggle} setToggle={setToggle} />
            </BrowserRouter>
          </ThemeContext.Provider>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};
