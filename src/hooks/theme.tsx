import React, { createContext, useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Cookies } from 'react-cookie';

type ThemeProp = 'light' | 'dark';

interface IThemeContext {
  theme: string;
  changeTheme(): void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

interface IThemeContextProvider {
  children: JSX.Element[] | JSX.Element;
}

interface IContainer {
  customTheme: string;
}

const StyledTheme = styled.div<IContainer>`
  .themed {
    transition: all 0.2s ease-in-out;
    ${({ customTheme }) =>
      customTheme === 'dark'
        ? css`
            background-color: var(--logged-dark);
            color: var(--white);
          `
        : css`
            background-color: var(--white);
            color: var(--logged);
          `}
  }

  .themed-aux {
    transition: all 0.2s ease-in-out;
    ${({ customTheme }) =>
      customTheme === 'dark'
        ? css`
            background-color: var(--logged);
            color: var(--white);
          `
        : css`
            background-color: var(--light);
            color: var(--logged);
          `}
  }
`;

const ThemeContextProvider: React.FC = ({ children }: IThemeContextProvider) => {
  const [theme, setTheme] = useState<ThemeProp>('dark');

  useEffect(() => {
    fetchPrevious();
  }, []);

  const fetchPrevious = (): void => {
    const cookies = new Cookies();
    let previousTheme: ThemeProp = cookies.get('@my-school:theme');
    previousTheme = !previousTheme ? 'dark' : previousTheme;
    setTheme(previousTheme);
  };

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    const cookies = new Cookies();
    setTheme(newTheme);
    cookies.set('@my-school:theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <StyledTheme customTheme={theme}>{children}</StyledTheme>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeContext');
  return context;
};

export { ThemeContextProvider, useTheme };
