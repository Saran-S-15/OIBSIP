import React from 'react';
import { daisyUIThemes } from '../utils/theme';
import { useThemeStore } from '../store/useThemeStore';

const SettingsPage = () => {

    const { themebg, setTheme } = useThemeStore();

    return (
        <div className='min-h-[calc(100vh-2rem)] p-8 bg-base-200'>
            <h2 className='text-2xl font-bold mb-6'>Choose a Theme</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5'>
                {daisyUIThemes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setTheme(theme.name)}
                        className={`w-full p-4 rounded-lg shadow bg-base-100 hover:scale-105 transition-transform duration-200 text-center cursor-pointer ${themebg == theme.name ? 'ring-2 ring-primary' : ""}`}
                    >
                        <div
                            className='w-full h-10 rounded mb-2'
                            style={{ backgroundColor: theme.color }}
                        ></div>
                        <div className='text-sm font-medium capitalize'>{theme.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
