import React, {useState,createContext,useEffect} from 'react'

//Create a context to manage the theme state (dark or light) and provide a toggle function.
export const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
    const[theme,setTheme]=useState('light');

    const changeTheme=()=>{
        setTheme((prevtheme)=>prevtheme==='light'?'dark':'light');
    }
    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    }, [theme]);
    return(
        <ThemeContext.Provider value={{theme,changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
