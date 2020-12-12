import { createContext, useContext, useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'

type ThemeProp = 'light' | 'dark'

interface IThemeContext {
  theme: string
  changeTheme(): void
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeProp>('dark')

  useEffect(() => {
    fetchPrevious()
  }, [])

  const fetchPrevious = (): void => {
    const cookies = new Cookies()
    let previousTheme: ThemeProp = cookies.get('@my-school:theme')
    previousTheme = !previousTheme ? 'dark' : previousTheme
    setTheme(previousTheme)
  }

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    const cookies = new Cookies()
    setTheme(newTheme)
    cookies.set('@my-school:theme', newTheme)
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
