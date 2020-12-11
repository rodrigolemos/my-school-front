import { createContext, useContext, useState } from 'react'

type ThemeProp = 'light' | 'dark'

interface IThemeContext {
  theme: string
  changeTheme(): void
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeProp>('light')

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useTheme must be used within ThemeContext')
  return context
}

export { ThemeContextProvider, useTheme }
