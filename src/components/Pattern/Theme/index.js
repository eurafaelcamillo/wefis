import React from 'react';
import PropTypes from 'prop-types';

import THEME_COLORS from './colors';
import THEME_SIZES from './sizes';

const DefaultTheme = {
    COLORS: THEME_COLORS,
    SIZES: THEME_SIZES,
};

export default DefaultTheme;

const ThemeContext = React.createContext();

export function withTheme(Component, styles) {
    return class extends React.Component {
        render() {
            const { props } = this;
            return (
                <ThemeContext.Consumer>
                    {theme => (
                        <Component
                            {...props}
                            theme={{ ...DefaultTheme, ...theme }}
                            styles={styles && styles({ ...DefaultTheme, ...theme })}
                        />
                    )}
                </ThemeContext.Consumer>
            );
        }
    };
}

export class ThemeProvider extends React.Component {
    static defaultProps = {
        children: null,
        theme: {},
    }

    render() {
        const { theme, children } = this.props;
        const { COLORS: CUSTOM_COLORS, SIZES: CUSTOM_SIZES, customTheme } = theme;

        const providerTheme = {
            COLORS: { ...DefaultTheme.COLORS, ...CUSTOM_COLORS },
            SIZES: { ...DefaultTheme.SIZES, ...CUSTOM_SIZES },
            ...customTheme
        };

        return (
            <ThemeContext.Provider value={providerTheme}>
                {children}
            </ThemeContext.Provider>
        );
    }
}

ThemeProvider.propTypes = {
    children: PropTypes.any,
    theme: PropTypes.any,
};