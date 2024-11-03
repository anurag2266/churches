// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { themes } from './themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('appTheme');
            if (savedTheme && themes[savedTheme]) {
                setTheme(themes[savedTheme]);
            }
        };
        loadTheme();
    }, []);
    const switchTheme = (themeName) => {
        const newTheme = themes[themeName] || themes.light;
        setTheme(newTheme);
        AsyncStorage.setItem('appTheme', themeName);
    };

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
