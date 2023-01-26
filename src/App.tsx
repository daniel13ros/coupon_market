import React, { useState } from 'react';
import './App.css';
import Footer from './Components/LayoutArea/Footer/Footer';
import Header from './Components/LayoutArea/Header/Header';
import Main from './Components/LayoutArea/Main/Main';
import Menu from './Components/LayoutArea/Menu/Menu';

const getValueFromLocalStorage = (): string => {
  const theme = localStorage.getItem("theme");
  if (theme == null) {
      return "light";
  }
  return theme;
}

function App() {
    const [theme, setTheme] = useState<string>(getValueFromLocalStorage());

    const switchTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
  }
  return (
    <div className="App" data-theme={theme}>
        <div className='flex-center'>
          <button className="dark-light"onClick={switchTheme}>{theme === 'dark' ? <span>🌙</span> : <span>🔆</span>}</button>
        </div>
        <Header/>
        <Menu/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
